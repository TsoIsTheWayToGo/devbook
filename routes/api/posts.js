const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load post model
const Post = require('../../models/Post')

//load post validation
const validatePostInput = require('../../validation/post')
// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));




// @route   POST api/posts
// @desc    Create Post
// @access  private

router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {
  const {errors, isValid} = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const newPost = new Post ({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
}
);

// @route   Get api/posts
// @desc    Get Post
// @access  private
router.get('/', (req,res) => {
  Post.find()
  .sort({date: -1})
  .then(posts => res.json(posts))
  .catch(err => res.status(404))
})



module.exports = router;
