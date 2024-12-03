
const express = require('express');
const connectdb=require('./db.js')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');



const app = express();
app.use(express.json());
app.use(cookieParser());
connectdb();

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.post('/logout', (req, res) => {
  const token = req.cookies.token; // Access the 'token' cookie from the request

  // Check if the 'token' cookie exists
  if (!token) {
    return res.status(400).json({ message: 'You are not logged in' });
  }

  // Clear the 'token' cookie
  res.clearCookie('token');

  // Send a response back to the client indicating a successful logout
  res.status(200).json({ message: 'Logged out successfully' });
});


const PORT= 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));