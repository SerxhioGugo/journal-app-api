const express = require('express');
const dotenv = require('dotenv');

//Load dotenv files (environment variables)
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
