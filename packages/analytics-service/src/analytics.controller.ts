import { Controller, Post, Get, Body, Query, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnalyticsService, TrackPageViewData } from './analytics.service';

export interface TrackPageViewRequest {
  sessionId: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  pageUrl: string;
  pageTitle: string;
  referrer?: string;
  screenResolution?: string;
  language: string;
  duration?: number;
}

export interface AnalyticsQuery {
  startDate?: string;
  endDate?: string;
  pageUrl?: string;
}

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async trackPageView(@Body() data: TrackPageViewRequest) {
    await this.analyticsService.trackPageView(data);
    return { success: true, message: 'Page view tracked successfully' };
  }

  @Get('stats')
  async getAnalytics(@Query() query: AnalyticsQuery) {
    const startDate = query.startDate ? new Date(query.startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endDate = query.endDate ? new Date(query.endDate) : new Date();
    
    return this.analyticsService.getAnalytics(startDate, endDate);
  }

  @Get('page/:pageUrl')
  async getPageAnalytics(
    @Param('pageUrl') pageUrl: string,
    @Query() query: AnalyticsQuery
  ) {
    const startDate = query.startDate ? new Date(query.startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endDate = query.endDate ? new Date(query.endDate) : new Date();
    
    const decodedPageUrl = decodeURIComponent(pageUrl);
    return this.analyticsService.getPageAnalytics(decodedPageUrl, startDate, endDate);
  }

  @Get('realtime')
  async getRealtimeStats() {
    return this.analyticsService.getRealtimeStats();
  }

  // Microservice message patterns
  @MessagePattern({ cmd: 'track_page_view' })
  async handleTrackPageView(@Payload() data: TrackPageViewData) {
    try {
      await this.analyticsService.trackPageView(data);
      return { success: true, message: 'Page view tracked successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'get_analytics' })
  async handleGetAnalytics(@Payload() data: { startDate?: string; endDate?: string }) {
    try {
      const startDate = data.startDate ? new Date(data.startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = data.endDate ? new Date(data.endDate) : new Date();
      
      return await this.analyticsService.getAnalytics(startDate, endDate);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'get_page_analytics' })
  async handleGetPageAnalytics(@Payload() data: { pageUrl: string; startDate?: string; endDate?: string }) {
    try {
      const startDate = data.startDate ? new Date(data.startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const endDate = data.endDate ? new Date(data.endDate) : new Date();
      
      return await this.analyticsService.getPageAnalytics(data.pageUrl, startDate, endDate);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @MessagePattern({ cmd: 'get_realtime_stats' })
  async handleGetRealtimeStats() {
    try {
      return await this.analyticsService.getRealtimeStats();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
} 