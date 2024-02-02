const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;



const userSchema2 = mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
  authSource: {
    type: String,
    enum: ['self', 'google'],
    default: 'self',
  },
});

const User2 = mongoose.model('User2', userSchema2);

module.exports = User2;
