require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Asher976123@',
  database: process.env.DB_NAME || 'react',
  port: process.env.DB_PORT || 3306,
  authPlugins:{
    mysql_native_password: true,
  },
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Exit if DB connection fails
  }
  console.log('Connected to MySQL database');
});

// Define route
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const insertQuery = 'INSERT INTO formData (name, email, message) VALUES (?, ?, ?)';
  db.query(insertQuery, [name, email, message], (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ message: 'Failed to save data', error: err.message });
    }
    return res.status(200).json({ message: 'Form submitted successfully!' });
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
