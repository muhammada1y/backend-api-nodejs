// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey } = require('../config/jwt');
const router = require('../routes/authRoutes');

exports.register = async (req, res) => {
  try {
    // Get values/data from the user request body
    const { username, password, role } = req.body;

    // Check if all fields are provided
    if (!(username && password && role)) {
      return res.status(400).send("All fields are required");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(401).send("This username is already taken");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the user in the database
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    // Create JWT token
    const token = jwt.sign({
       id: user._id, username: user.username, role: user.role 
      }, secretKey, {
      expiresIn: '1h',
    });

    // Set the token in the response and send user details
    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// login in controller
exports.login = async (req, res) => {
  try {
    // Get data from the request body
    const { username, password } = req.body;
      console.log(username);
    // Check if both username and password are provided
    if (!(username && password)) {
      return res.status(400).send('All fields are required');
    }

    // Check if the user is in the database
    const userFound = await User.findOne({ username });

    // If user is not found
    if (!userFound) {
      return res.status(401).json({ message: 'No user found' });
    }

    // Match the password
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    // If password does not match
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If both username and password are valid, generate and send the JWT token
    const token = jwt.sign(
      {
        id: userFound._id,
        username: userFound.username,
        role: userFound.role,
      },
      secretKey,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({ user: userFound, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

