//Main starting point of the app

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//Load dotenv files (environment variables)
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Route files
const posts = require('./routes/posts');

const app = express();

// Body parser
app.use(express.json());

//Dev logging middleware / run only on dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('default', morgan);

//Mount routers
app.use('/api/v1/posts', posts);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  );
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & Exit process
  server.close(() => process.exit(1));
});
