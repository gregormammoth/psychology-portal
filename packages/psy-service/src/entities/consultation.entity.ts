import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Consultation extends Document {
  @Prop({ required: true })
  psychologistId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 15, max: 180 })
  duration: number;

  @Prop({ required: true, enum: ['online', 'offline'] })
  type: 'online' | 'offline';

  @Prop({ type: [String], required: true })
  timeSlots: string[];

  @Prop({ required: true, enum: ['available', 'unavailable'] })
  status: 'available' | 'unavailable';

  @Prop({ min: 0, max: 5, default: 0 })
  rating: number;

  @Prop({ min: 0, default: 0 })
  totalReviews: number;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation); 