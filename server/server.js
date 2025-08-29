const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

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
let alerts = [
  { id: 1, message: 'Emergency Alert near Joburg' },
  { id: 2, message: 'Suspicious activity in Pretoria' },
];

// ✅ API endpoint
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// ✅ Socket.io setup
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  // Send existing alerts to the client
  socket.emit('alerts', alerts);

  // Listen for new alerts
  socket.on('newAlert', (alert) => {
    alerts.push(alert);
    io.emit('alerts', alerts);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
