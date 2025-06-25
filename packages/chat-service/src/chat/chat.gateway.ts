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
  }

  @SubscribeMessage('message:send')
  async handleMessage(client: Socket, message: { text: string }) {
    const username = this.chatService.getUser(client.id);
    if (!username) {
      return;
    }
    
    const userMessage = await this.chatService.createMessage(
      message.text,
      client.id,
      username,
    );
    client.emit('message:receive', userMessage);

    const aiResponse = await this.chatService.generateAIResponse(message.text, client.id);
    const aiMessage = await this.chatService.createMessage(
      aiResponse,
      'ai',
      'AI Assistant',
      true,
    );
    client.emit('message:receive', aiMessage);
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