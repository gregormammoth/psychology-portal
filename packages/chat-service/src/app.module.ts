import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL || 'mongodb://admin:password@localhost:27017/psychology_portal?authSource=admin'),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class AppModule {} 