const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (replace 'your_mongodb_uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://vamshigangamma2000:home@cluster0.ani2qvi.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML, CSS, and JS files
app.use(express.static('public'));

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  }  catch (error) {
    console.error('Error during registration:', error && error.message);
    // if (res) {
    //   res.status(500).json({ error: 'Internal server error' });
    // }
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user with the given email and password exists
        const user = await User.findOne({ email, password });

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error && error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Serve the registration form
// app.get('/register', (req, res) => {
//   res.sendFile(__dirname + '/register.html');
// });

// // Serve the login form
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/login.html');
//   });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
