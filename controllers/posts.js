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

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  //Loop over removeFields and delete them rom reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  //Creating possible operators (&gt, gte)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Post.find(JSON.parse(queryStr));

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sort by date
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Post.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //excecuting query
  const posts = await query;

  // Pagination Result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res
    .status(200)
    .json({ success: true, count: posts.length, pagination, data: posts });
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
