import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  fromUsername: string;

  @Prop({ default: false })
  isAI: boolean;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message); 