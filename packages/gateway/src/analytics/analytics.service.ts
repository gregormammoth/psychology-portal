import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export interface TrackPageViewData {
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

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject('ANALYTICS_SERVICE') private readonly analyticsClient: ClientProxy,
  ) {}

  async trackPageView(data: TrackPageViewData) {
    return this.analyticsClient.send({ cmd: 'track_page_view' }, data).toPromise();
  }

  async getAnalytics(startDate?: string, endDate?: string) {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, { startDate, endDate }).toPromise();
  }

  async getPageAnalytics(pageUrl: string, startDate?: string, endDate?: string) {
    return this.analyticsClient.send({ cmd: 'get_page_analytics' }, { pageUrl, startDate, endDate }).toPromise();
  }

  async getRealtimeStats() {
    return this.analyticsClient.send({ cmd: 'get_realtime_stats' }, {}).toPromise();
  }
} 