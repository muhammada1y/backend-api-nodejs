// const express = require('express');
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client();
// const app = express();
// const PORT = 3001;


// // API for Google Authentication
// app.post('/google-auth', async (req, res) => {
//     const { credential, client_id } = req.body;
//     try {
//         const ticket = await client.verifyIdToken({
//             idToken: credential,
//             audience: client_id,
//         });
//         const payload = ticket.getPayload();
//         const userid = payload['sub'];
//         res.status(200).json({ payload });
//     } catch (err) {
//         res.status(400).json({ err });
//     }
// });

// const jwt = require('jsonwebtoken');

// // jwt secret — store this JWT secret in your .env file
// const JWT_SECRET = process.env.JWT_SECRET;

// // API for Google Authentication
// app.post('/google-auth', async (req, res) => {
//     // …

//     // Check if the user exists in your database
//     let user = await User.findOne({ email });
//     if (!user) {
//         // Create a user if they do not exist
//         user = await User.create({
//             email,
//             name: `${given_name} ${family_name}`,
//             authSource: 'google',
//         });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ user }, JWT_SECRET);
//     res.status(200).cookie('token', token, { http: true }).json({ payload });
// });

// app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));


// =====================================================================================================

const express = require('express');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// MongoDB connection
mongoose.connect('mongodb+srv://f1stmain601:ASDasd123@cluster0.jtutx9a.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MongoDB User Schema
const googleUserSchema = new mongoose.Schema({
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
    },
    // Other Google-specific fields you may want to store
    // ...
  
    // Timestamps to track when the user document was created and updated
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);
  
  module.exports = GoogleUser;
  
const User = mongoose.model('User', userSchema);

app.get('/google-auth', async (req, res) => {
    try {
      const users = await User.find(); // Retrieve all users from the database
      res.status(200).json(users); // Send the users in JSON format
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));

// API for Google Authentication
app.post('/google-auth', async (req, res) => {
    const { credential, client_id } = req.body;
    console.log(credential)
    try {
        const client = new OAuth2Client(client_id);
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });

        const payload = ticket.getPayload();
        const userid = payload['sub'];

        // Perform actions with the authenticated user if needed
        // ...

        res.status(200).json({ payload });
    } catch (err) {
        res.status(400).json({ err: 'Google Authentication failed' });
    }
});

// API for Google Authentication with MongoDB
app.post('/google-auth-mongo', async (req, res) => {
    const { credential, client_id } = req.body;

    try {
        const client = new OAuth2Client(client_id);
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });

        const payload = ticket.getPayload();
        const { email, given_name, family_name } = payload;

        // Check if the user exists in your MongoDB database
        let user = await User.findOne({ email });

        if (!user) {
            // Create a user if they do not exist
            user = await User.create({
                email,
                name: `${given_name} ${family_name}`,
                authSource: 'google',
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ user }, JWT_SECRET);
        res.status(200).cookie('token', token, { httpOnly: true }).json({ payload });
    } catch (err) {
        res.status(400).json({ err: 'Google Authentication failed' });
    }
});

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
