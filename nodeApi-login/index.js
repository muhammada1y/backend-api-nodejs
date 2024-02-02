// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const { url } = require('./src/config/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Use auth routes
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
