const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//load User moder
const User = require('../../models/User')
//@route GET api/users/test
//@desc Tests users route
//@access Public

router.get('/test', (req, res) => res.json({msg: "Users Works"}));// will automattically do 200

//@route GET api/users/register
//@desc Register users 
//@access Public
router.post('./register', (req,res) => {
  User.findOne({email: req.body.email}) //must require body parser in server.js
  .then(user => {
    if(user){
      return res.status(400).json({email: 'Email already exist'})
    }else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //Default
      })

      const newUser = new User({
        name: req.body.name, //.body is a body-parser method
        email: req.body.email,
        avatar,//: avatar,es6 magic // will come from gravatar
        password: req.body.password
      });
      bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))  //for now jsut use this for postman
            .catch(err => console.log(err))

        })
      })
    };
  })
})

module.exports = router;