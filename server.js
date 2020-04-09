const express = require('express');
const dotenv = require('dotenv');

//Route files
const posts = require('./routes/posts');

//Load dotenv files (environment variables)
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

const app = express();

//Mount routers
app.use('/api/v1/posts', posts);

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
