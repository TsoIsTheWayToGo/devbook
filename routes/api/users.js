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
router.post('/register', (req,res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        return res.status(400).json({email: 'Email already exist'})
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg', //rating
          d: 'mm' //Default
        });

      const newUser = new User({
        name: req.body.name, //.body is a body-parser method
        email: req.body.email,
        avatar,//: avatar,es6 magic // will come from gravatar
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt)=> {
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


//@route GET api/users/login
//@desc Login user/ returning JWT Token
//@access Public

router.post('/login',(req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      // check for user
      if (!user){
        return res.status(404).json({email: "User not found"});
      }

      //check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch){
          res.json({msg: 'Success'});
          } else {
            return res.status(400).json({password: 'Password incorrect'})
          }
        })
    });
})

module.exports = router;


















































































































































































































































































































































































//