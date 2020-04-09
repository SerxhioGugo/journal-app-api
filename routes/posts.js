const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/posts');

const router = express.Router();

//GET all posts & POST
router.route('/').get(getPosts).post(createPost);

//GET & POST
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

//Make this available to use in other files
module.exports = router;
