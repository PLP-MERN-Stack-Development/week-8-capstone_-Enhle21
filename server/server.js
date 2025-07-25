
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// In-memory alerts array (replace with DB later)
let alerts = [
  { id: 1, message: 'Emergency Alert near Joburg' },
  { id: 2, message: 'Suspicious activity in Pretoria' },
];

// API endpoint to get alerts
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send current alerts to the connected client
  socket.emit('alerts', alerts);

  // Listen for new alert from client
  socket.on('newAlert', (alert) => {
    alerts.push(alert);
    // Broadcast updated alerts to all connected clients
    io.emit('alerts', alerts);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Replace with your real Mongo URI
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Enhleza:UaelyVHlNmSA1T4Z@cluster0.pdx7fx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));
