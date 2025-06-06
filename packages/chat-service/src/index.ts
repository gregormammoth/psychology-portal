import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Store active users
const activeUsers = new Map<string, string>();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('user:join', (username: string) => {
    activeUsers.set(socket.id, username);
    io.emit('user:joined', {
      userId: socket.id,
      username,
      timestamp: new Date().toISOString()
    });
    
    // Send current users list to the new user
    socket.emit('users:list', Array.from(activeUsers.entries()));
  });

  // Handle new messages
  socket.on('message:send', (message: { text: string; to?: string }) => {
    const username = activeUsers.get(socket.id);
    const messageData = {
      id: Date.now().toString(),
      text: message.text,
      from: socket.id,
      fromUsername: username,
      timestamp: new Date().toISOString()
    };

    if (message.to) {
      // Private message
      socket.to(message.to).emit('message:receive', messageData);
      socket.emit('message:receive', messageData);
    } else {
      // Broadcast message
      io.emit('message:receive', messageData);
    }
  });

  // Handle typing status
  socket.on('user:typing', (isTyping: boolean) => {
    const username = activeUsers.get(socket.id);
    socket.broadcast.emit('user:typing', {
      userId: socket.id,
      username,
      isTyping
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = activeUsers.get(socket.id);
    activeUsers.delete(socket.id);
    io.emit('user:left', {
      userId: socket.id,
      username,
      timestamp: new Date().toISOString()
    });
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Chat service running on port ${PORT}`);
}); 