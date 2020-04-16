//Import models
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Post = require('../models/Post');

//Setting up routes to seperate controllers

/*--------------------------------------------------------------------------*/

// @desc        Get all posts
// @route       GET /api/v1/posts
// @access      Public

exports.getPosts = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = Post.find(JSON.parse(queryStr));

  console.log(req.query);
  const posts = await query;
  res.status(200).json({ success: true, count: posts.length, data: posts });
});

/*--------------------------------------------------------------------------*/
// @desc        Get a single post
// @route       GET /api/v1/posts/:id
// @access      Public

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  //Check if the id is in the database
  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  //Check if the id is badly formatted
  res.status(200).json({ success: true, data: post });
});

/*--------------------------------------------------------------------------*/
// @desc        Create new post
// @route       POST /api/v1/posts/
// @access      Private

exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    success: true,
    data: post,
  });
});

/*--------------------------------------------------------------------------*/
// @desc        Update post
// @route       PUT /api/v1/posts/:id
// @access      Private

exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: post });
});

/*--------------------------------------------------------------------------*/
// @desc        Delete post
// @route       DELETE /api/v1/posts/:id
// @access      Private

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
