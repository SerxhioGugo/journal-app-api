//Import models
const Post = require('../models/Post');

//Setting up routes to seperate controllers

/*--------------------------------------------------------------------------*/

// @desc        Get all posts
// @route       GET /api/v1/posts
// @access      Public

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

/*--------------------------------------------------------------------------*/
// @desc        Get a single post
// @route       GET /api/v1/posts/:id
// @access      Public

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false });
  }
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

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

/*--------------------------------------------------------------------------*/
// @desc        Delete post
// @route       DELETE /api/v1/posts/:id
// @access      Private

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
