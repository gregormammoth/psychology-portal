import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log('User connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    const username = this.chatService.getUser(client.id);
    this.chatService.removeUser(client.id);
    
    this.server.emit('user:left', {
      userId: client.id,
      username,
      timestamp: new Date().toISOString(),
    });
    
    console.log('User disconnected:', client.id);
  }

  @SubscribeMessage('user:join')
  handleUserJoin(client: Socket, username: string) {
    this.chatService.addUser(client.id, username);
    
    this.server.emit('user:joined', {
      userId: client.id,
      username,
      timestamp: new Date().toISOString(),
    });
    
    client.emit('users:list', this.chatService.getAllUsers());
  }

  @SubscribeMessage('message:send')
  handleMessage(client: Socket, message: { text: string; to?: string }) {
    const username = this.chatService.getUser(client.id);
    if (!username) {
      return; // Skip message handling if user not found
    }
    
    const messageData = this.chatService.createMessage(
      message.text,
      client.id,
      username,
    );

    if (message.to) {
      // Private message
      client.to(message.to).emit('message:receive', messageData);
      client.emit('message:receive', messageData);
    } else {
      // Broadcast message
      this.server.emit('message:receive', messageData);
    }
  }

  @SubscribeMessage('user:typing')
  handleTyping(client: Socket, isTyping: boolean) {
    const username = this.chatService.getUser(client.id);
    client.broadcast.emit('user:typing', {
      userId: client.id,
      username,
      isTyping,
    });
  }
} 