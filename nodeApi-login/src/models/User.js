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
    type: String,
    unique: true,
    default: null
  },
  name: {
    type: String,
    unique: true,
    default: null
  },
  password: {
    required: false,
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  authSource: {
    type: String,
    enum: ['self', 'google'],
    default: 'self',
  },
});

const UserSchema2 = mongoose.model('googleUser', userSchema2);

module.exports = UserSchema2;
