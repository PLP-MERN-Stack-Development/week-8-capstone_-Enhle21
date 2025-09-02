// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middlewares
app.use(cors({
  origin: [
    "https://women-safety-app-ru25.vercel.app",
    "http://localhost:3000"
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
app.use(express.json());

// Attach socket.io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Women Safety App Backend is running");
});

// -----------------------
// Alerts
// -----------------------
let alerts = [
  { id: 1, message: 'Emergency Alert near Joburg' },
  { id: 2, message: 'Suspicious activity in Pretoria' },
];

app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// -----------------------
// Socket.io
// -----------------------
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.emit('alerts', alerts);

  socket.on('newAlert', (alert) => {
    alerts.push(alert);
    io.emit('alerts', alerts);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// -----------------------
// User Registration
// -----------------------
const User = require('./models/User'); // make sure you have models/User.js

app.post('/api/users/register', async (req, res) => {
  const { name, surname, dob, cellphone, email } = req.body;

  if (!name || !surname || !dob || !cellphone || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({ name, surname, dob, cellphone, email });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
