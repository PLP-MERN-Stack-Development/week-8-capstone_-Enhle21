const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/alerts', require('./routes/alerts'));

io.on('connection', socket => {
  console.log("Client connected");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
