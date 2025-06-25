import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageViewDocument = PageView & Document;

@Schema({ timestamps: true })
export class PageView {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true, index: true })
  sessionId: string;

  @Prop({ index: true })
  userId?: string;

  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ required: true, index: true })
  pageUrl: string;

  @Prop({ required: true })
  pageTitle: string;

  @Prop()
  referrer?: string;

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

  @Prop()
  screenResolution?: string;

  @Prop({ required: true })
  language: string;

  @Prop({ type: Date, default: Date.now, index: true })
  timestamp: Date;

  @Prop()
  duration?: number;
}

export const PageViewSchema = SchemaFactory.createForClass(PageView);

// Create compound indexes for better query performance
PageViewSchema.index({ timestamp: -1, sessionId: 1 });
PageViewSchema.index({ pageUrl: 1, timestamp: -1 });
PageViewSchema.index({ country: 1, timestamp: -1 });
PageViewSchema.index({ userId: 1, timestamp: -1 });

// TTL index to automatically delete documents after 2 years
PageViewSchema.index({ timestamp: 1 }, { expireAfterSeconds: 63072000 }); // 2 years in seconds 