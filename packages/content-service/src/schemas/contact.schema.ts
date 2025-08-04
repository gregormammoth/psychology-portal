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

  @Prop({ required: false })
  preferredDate: string;

  @Prop({ required: false })
  preferredTime: string;

  @Prop({ required: false, default: 'individual' })
  consultationType: string;

  @Prop({ required: false, default: [] })
  problems: string[];

  @Prop()
  message: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  submittedAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact); 