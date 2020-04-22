const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Achievements = require('./models/Achievement');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JSON files

const achievements = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/achievements.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Achievements.create(achievements);
    console.log('Achievements imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data

const deleteData = async () => {
  try {
    await Achievements.deleteMany();
    console.log('Achievements destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
