import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { HealthController } from './health.controller';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:psypupel@13.61.155.215:27017/psychology_portal?authSource=admin'), // TODO: process.env.MONGODB_URL || 'mongodb://admin:password@localhost:27017/psychology_portal?authSource=admin'),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [HealthController],
  providers: [ChatGateway, ChatService],
})
export class AppModule {} 