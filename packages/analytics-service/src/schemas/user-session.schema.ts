import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserSessionDocument = UserSession & Document;

@Schema({ timestamps: true })
export class UserSession {
  @Prop({ required: true, unique: true, index: true })
  sessionId: string;

  @Prop({ index: true })
  userId?: string;

  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ index: true })
  country?: string;

  @Prop()
  city?: string;

  @Prop({ required: true })
  deviceType: string;

  @Prop({ required: true })
  browser: string;

  @Prop({ required: true })
  os: string;

  @Prop({ required: true })
  language: string;

  @Prop({ type: Date, default: Date.now, index: true })
  startedAt: Date;

  @Prop({ type: Date, default: Date.now, index: true })
  lastActivity: Date;

  @Prop({ default: 0 })
  pageViews: number;

  @Prop()
  duration?: number;
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);

// Create indexes for better query performance
UserSessionSchema.index({ startedAt: -1 });
UserSessionSchema.index({ lastActivity: -1 });
UserSessionSchema.index({ userId: 1, startedAt: -1 });

// TTL index to automatically delete documents after 2 years
UserSessionSchema.index({ startedAt: 1 }, { expireAfterSeconds: 63072000 }); // 2 years in seconds 