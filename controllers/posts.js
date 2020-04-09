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

exports.createPost = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new post' });
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
