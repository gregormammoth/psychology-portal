import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  preferredContactType: string;

  @Prop({ required: true })
  preferredDate: string;

  @Prop({ required: true })
  preferredTime: string;

  @Prop({ required: true })
  consultationType: string;

  @Prop()
  message: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  submittedAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact); 