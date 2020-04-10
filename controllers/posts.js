//Import models
const Post = require('../models/Post');

//Setting up routes to seperate controllers

/*--------------------------------------------------------------------------*/

// @desc        Get all posts
// @route       GET /api/v1/posts
// @access      Public

exports.getPosts = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all posts' });
};

/*--------------------------------------------------------------------------*/
// @desc        Get a single post
// @route       GET /api/v1/posts/:id
// @access      Public

exports.getPost = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get post with ID: ${req.params.id}` });
};

/*--------------------------------------------------------------------------*/
// @desc        Create new post
// @route       POST /api/v1/posts/
// @access      Private

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

/*--------------------------------------------------------------------------*/
// @desc        Update post
// @route       PUT /api/v1/posts/:id
// @access      Private

exports.updatePost = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update post with ID: ${req.params.id}` });
};

/*--------------------------------------------------------------------------*/
// @desc        Delete post
// @route       DELETE /api/v1/posts/:id
// @access      Private

exports.deletePost = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete post with ID: ${req.params.id}` });
};
