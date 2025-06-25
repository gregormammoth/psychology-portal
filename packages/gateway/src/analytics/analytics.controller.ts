import { Controller, Post, Get, Body, Query, Param, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Request } from 'express';

export interface TrackPageViewRequest {
  sessionId: string;
  userId?: string;
  pageUrl: string;
  pageTitle: string;
  referrer?: string;
  screenResolution?: string;
  language: string;
  duration?: number;
}

@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async trackPageView(@Body() data: TrackPageViewRequest, @Req() req: Request) {
    const ipAddress = this.getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';

    const trackingData = {
      ...data,
      ipAddress,
      userAgent,
    };

    return this.analyticsService.trackPageView(trackingData);
  }

  @Get('stats')
  async getAnalytics(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.analyticsService.getAnalytics(startDate, endDate);
  }

  @Get('page/:pageUrl')
  async getPageAnalytics(
    @Param('pageUrl') pageUrl: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.analyticsService.getPageAnalytics(pageUrl, startDate, endDate);
  }

  @Get('realtime')
  async getRealtimeStats() {
    return this.analyticsService.getRealtimeStats();
  }

  private getClientIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];
    
    if (forwarded) {
      return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0].trim();
    }
    
    if (realIp) {
      return Array.isArray(realIp) ? realIp[0] : realIp;
    }
    
    return req.socket.remoteAddress || req.ip || '127.0.0.1';
  }
} 