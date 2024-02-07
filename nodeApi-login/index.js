// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const { url } = require('./src/config/database');

require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const port = process.env.PORT;

app.use(bodyParser.json());

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Use auth routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
