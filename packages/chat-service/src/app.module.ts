import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class AppModule {} 