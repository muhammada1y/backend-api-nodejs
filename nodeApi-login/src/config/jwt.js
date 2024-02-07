// config/jwt.js
require('dotenv').config();
module.exports = {
  secretKey: process.env.SECREKTKEY,
};
