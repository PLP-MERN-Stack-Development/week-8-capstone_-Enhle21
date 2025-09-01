<<<<<<< HEAD
=======

>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

<<<<<<< HEAD
// ✅ Connect to MongoDB (only once)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middlewares
app.use(cors({
  origin: "https://women-safety-app-ru25.vercel.app", // restrict to your frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
app.use(express.json());

// ✅ Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 Women Safety App Backend is running");
});

// ✅ Alerts data (replace with DB later)
=======
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
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
let alerts = [
  { id: 1, message: 'Emergency Alert near Joburg' },
  { id: 2, message: 'Suspicious activity in Pretoria' },
];

<<<<<<< HEAD
// ✅ API endpoint
=======
// API endpoint to get alerts
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

<<<<<<< HEAD
// ✅ Socket.io setup
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  // Send existing alerts to the client
  socket.emit('alerts', alerts);

  // Listen for new alerts
  socket.on('newAlert', (alert) => {
    alerts.push(alert);
=======
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send current alerts to the connected client
  socket.emit('alerts', alerts);

  // Listen for new alert from client
  socket.on('newAlert', (alert) => {
    alerts.push(alert);
    // Broadcast updated alerts to all connected clients
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
    io.emit('alerts', alerts);
  });

  socket.on('disconnect', () => {
<<<<<<< HEAD
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
=======
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
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
