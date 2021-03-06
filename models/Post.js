const mongoose = require('mongoose');
const slugify = require('slugify');

//MONGOOSE MODEL
//Change later for optional titleHeader or dailyEntry
const PostSchema = new mongoose.Schema({
  titleHeader: {
    type: String,
    required: true,
  },
  slug: String,
  dailyEntry: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photoOfTheDay: {
    type: String,
    default: null,
  },
});

//Makes this model available to use in the Controllers
module.exports = mongoose.model('Post', PostSchema);

// Create post slug from the name

PostSchema.pre('save', function (next) {
  this.slug = slugify(this.titleHeader, { lower: true });
  next();
});
