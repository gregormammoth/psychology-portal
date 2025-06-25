import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FaqDocument = Faq & Document;

@Schema({ timestamps: true })
export class Faq {
  @Prop({ required: true })
  question: string;

  @Prop()
  answer: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: 0 })
  priority: number;

  @Prop()
  category: string;

  @Prop({ default: Date.now })
  submittedAt: Date;

  @Prop()
  answeredAt: Date;

  @Prop()
  answeredBy: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq); 