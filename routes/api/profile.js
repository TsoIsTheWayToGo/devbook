const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); //for our protected routes

//load profile model
const Profile = require('../../models/Profile');

//load user profile
const User = require('../../models/User');


//@route GET api/profile/test
//@desc Tests profile route
//@access Public
router.get('/test', (req, res) => res.json({ msg: "Profile Works" }));// will automattically do 200


//@route GET api/profile
//@desc Get current user profile
//@access Private

router.get('/', passport.authenticate('jwt', {session: false}), 
(req, res) => {

  const errors = {};
  Profile.findOne({user: req.user.id})
  .then(profile => {

    if(!profile) {
      errors.noprofile = 'there is no profile for this user';
      return res.status(404).json(err);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err))
});







module.exports = router;



















































































































//