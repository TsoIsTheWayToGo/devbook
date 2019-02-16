const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load post model
const Post = require('../../models/Post')
//load profile model
const Profile = require('../../models/Profile')

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
    .catch(err => res.status(404).json({ noPostsFound: "No posts by that id" }))
})


// @route   Get api/posts/:id
// @desc    Get Post
// @access  public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({noPostFound: "No post by that id"}))
})

// @route   Delete api/posts/:id
// @desc    Delete post
// @access  private

router.delete('/:id', passport.authenticate('jwt',{ session: false}), (req,res) => {
  Profile.findOne({user: req.user.id})
  .then( profile  => {
    Post.findById(req.params.id)
    .then(post => {
      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized'})
      }
  
    //delete
    post.remove().then(() => res.json({success: true }))
    })

  .catch(err => res.status(404).json({ nopostfound: 'No post found'}))

})

})


// @route   Post api/posts/like/:id
// @desc    Delete post
// @access  private
router.post('like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
         if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ) {
           return res.status(400).json({ alreadyliked: 'User already like this post'})
         }
         post.likes.unshift({user: req.user.id});
        })

        .catch(err => res.status(404).json({ nopostfound: 'No post found' }));

    });

}
);
module.exports = router;
