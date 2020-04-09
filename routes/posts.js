const express = require('express');
const router = express.Router();

//Getting all users
router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all posts' });
});

//Get a single user for the specific id
router.get('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Get post with ID: ${req.params.id}` });
});

//Creating a new user
router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new post' });
});

//Display user for specific ID
router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update post with ID: ${req.params.id}` });
});

//Delete user by id
router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete post with ID: ${req.params.id}` });
});

//Make this available to use in other files
module.exports = router;
