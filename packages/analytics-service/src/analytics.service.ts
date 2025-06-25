import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as geoip from 'geoip-lite';
import { PageView, PageViewDocument } from './schemas/page-view.schema';
import { UserSession, UserSessionDocument } from './schemas/user-session.schema';

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

export interface DeviceInfo {
  deviceType: string;
  browser: string;
  os: string;
}

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectModel(PageView.name) private pageViewModel: Model<PageViewDocument>,
    @InjectModel(UserSession.name) private userSessionModel: Model<UserSessionDocument>,
  ) {}

  async trackPageView(data: TrackPageViewData): Promise<void> {
    try {
      const eventId = uuidv4();
      const timestamp = new Date();
      const geoData = geoip.lookup(data.ipAddress);
      const deviceInfo = this.parseUserAgent(data.userAgent);

      const pageView = new this.pageViewModel({
        eventId,
        sessionId: data.sessionId,
        userId: data.userId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        pageUrl: data.pageUrl,
        pageTitle: data.pageTitle,
        referrer: data.referrer,
        country: geoData?.country,
        city: geoData?.city,
        deviceType: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        screenResolution: data.screenResolution,
        language: data.language,
        timestamp,
        duration: data.duration,
      });

      await pageView.save();
      await this.updateUserSession(data, geoData, deviceInfo, timestamp);

      this.logger.log(`Page view tracked: ${data.pageUrl} for session ${data.sessionId}`);
    } catch (error) {
      this.logger.error('Failed to track page view', error);
      throw error;
    }
  }

  private async updateUserSession(
    data: TrackPageViewData,
    geoData: any,
    deviceInfo: DeviceInfo,
    timestamp: Date
  ): Promise<void> {
    try {
      const existingSession = await this.userSessionModel.findOne({ sessionId: data.sessionId });

      if (existingSession) {
        existingSession.lastActivity = timestamp;
        existingSession.pageViews += 1;
        if (data.userId && !existingSession.userId) {
          existingSession.userId = data.userId;
        }
        await existingSession.save();
      } else {
        const newSession = new this.userSessionModel({
          sessionId: data.sessionId,
          userId: data.userId,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          country: geoData?.country,
          city: geoData?.city,
          deviceType: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          language: data.language,
          startedAt: timestamp,
          lastActivity: timestamp,
          pageViews: 1,
        });

        await newSession.save();
      }
    } catch (error) {
      this.logger.error('Failed to update user session', error);
    }
  }

  private parseUserAgent(userAgent: string): DeviceInfo {
    const ua = userAgent.toLowerCase();

    let deviceType = 'desktop';
    let browser = 'unknown';
    let os = 'unknown';

    // Device type detection
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      deviceType = 'mobile';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      deviceType = 'tablet';
    }

    // Browser detection
    if (ua.includes('chrome') && !ua.includes('chromium') && !ua.includes('edg')) {
      browser = 'chrome';
    } else if (ua.includes('firefox')) {
      browser = 'firefox';
    } else if (ua.includes('safari') && !ua.includes('chrome')) {
      browser = 'safari';
    } else if (ua.includes('edg')) {
      browser = 'edge';
    } else if (ua.includes('opera') || ua.includes('opr')) {
      browser = 'opera';
    } else if (ua.includes('msie') || ua.includes('trident')) {
      browser = 'internet_explorer';
    }

    // OS detection
    if (ua.includes('windows')) {
      os = 'windows';
    } else if (ua.includes('macintosh') || ua.includes('mac os')) {
      os = 'macos';
    } else if (ua.includes('linux')) {
      os = 'linux';
    } else if (ua.includes('android')) {
      os = 'android';
    } else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ios')) {
      os = 'ios';
    }

    return { deviceType, browser, os };
  }

  async getAnalytics(startDate: Date, endDate: Date): Promise<any> {
    try {
      const [
        trafficStats,
        topPages,
        trafficByCountry,
        hourlyTraffic
      ] = await Promise.all([
        this.getTrafficStats(startDate, endDate),
        this.getTopPages(startDate, endDate, 10),
        this.getTrafficByCountry(startDate, endDate),
        this.getHourlyTraffic(startDate, endDate)
      ]);

      return {
        overview: trafficStats,
        topPages,
        trafficByCountry,
        hourlyTraffic,
        dateRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      };
    } catch (error) {
      this.logger.error('Failed to get analytics', error);
      throw error;
    }
  }

  async getPageAnalytics(pageUrl: string, startDate: Date, endDate: Date): Promise<any> {
    try {
      const pageViews = await this.getPageViews(startDate, endDate, pageUrl);
      return {
        pageUrl,
        analytics: pageViews,
        dateRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      };
    } catch (error) {
      this.logger.error('Failed to get page analytics', error);
      throw error;
    }
  }

  async getRealtimeStats(): Promise<any> {
    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
      const stats = await this.getTrafficStats(oneHourAgo, now);
      
      return {
        ...stats,
        timeframe: 'last_hour',
        timestamp: now.toISOString()
      };
    } catch (error) {
      this.logger.error('Failed to get realtime stats', error);
      throw error;
    }
  }

  private async getTrafficStats(startDate: Date, endDate: Date): Promise<any> {
    try {
      const [totalPageViews, uniqueVisitors, uniqueIps, registeredUsers, avgDuration] = await Promise.all([
        this.pageViewModel.countDocuments({
          timestamp: { $gte: startDate, $lte: endDate }
        }),
        this.pageViewModel.distinct('sessionId', {
          timestamp: { $gte: startDate, $lte: endDate }
        }).then(sessions => sessions.length),
        this.pageViewModel.distinct('ipAddress', {
          timestamp: { $gte: startDate, $lte: endDate }
        }).then(ips => ips.length),
        this.pageViewModel.distinct('userId', {
          timestamp: { $gte: startDate, $lte: endDate },
          userId: { $exists: true, $ne: null }
        }).then(users => users.length),
        this.pageViewModel.aggregate([
          { $match: { timestamp: { $gte: startDate, $lte: endDate }, duration: { $exists: true } } },
          { $group: { _id: null, avgDuration: { $avg: '$duration' } } }
        ]).then(result => result[0]?.avgDuration || 0)
      ]);

      return {
        total_page_views: totalPageViews,
        unique_visitors: uniqueVisitors,
        unique_ips: uniqueIps,
        registered_users: registeredUsers,
        avg_duration: Math.round(avgDuration)
      };
    } catch (error) {
      this.logger.error('Failed to get traffic stats', error);
      throw error;
    }
  }

  private async getPageViews(startDate: Date, endDate: Date, pageUrl?: string): Promise<any[]> {
    try {
      const matchQuery: any = { timestamp: { $gte: startDate, $lte: endDate } };
      if (pageUrl) {
        matchQuery.pageUrl = pageUrl;
      }

      const result = await this.pageViewModel.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: '$pageUrl',
            views: { $sum: 1 },
            unique_visitors: { $addToSet: '$sessionId' },
            unique_ips: { $addToSet: '$ipAddress' }
          }
        },
        {
          $project: {
            page_url: '$_id',
            views: 1,
            unique_visitors: { $size: '$unique_visitors' },
            unique_ips: { $size: '$unique_ips' }
          }
        },
        { $sort: { views: -1 } }
      ]);

      return result;
    } catch (error) {
      this.logger.error('Failed to get page views', error);
      throw error;
    }
  }

  private async getTopPages(startDate: Date, endDate: Date, limit: number = 10): Promise<any[]> {
    try {
      const result = await this.pageViewModel.aggregate([
        { $match: { timestamp: { $gte: startDate, $lte: endDate } } },
        {
          $group: {
            _id: { pageUrl: '$pageUrl', pageTitle: '$pageTitle' },
            views: { $sum: 1 },
            unique_visitors: { $addToSet: '$sessionId' },
            durations: { $push: '$duration' }
          }
        },
        {
          $project: {
            page_url: '$_id.pageUrl',
            page_title: '$_id.pageTitle',
            views: 1,
            unique_visitors: { $size: '$unique_visitors' },
            avg_duration: {
              $avg: {
                $filter: {
                  input: '$durations',
                  cond: { $ne: ['$$this', null] }
                }
              }
            }
          }
        },
        { $sort: { views: -1 } },
        { $limit: limit }
      ]);

      return result;
    } catch (error) {
      this.logger.error('Failed to get top pages', error);
      throw error;
    }
  }

  private async getTrafficByCountry(startDate: Date, endDate: Date): Promise<any[]> {
    try {
      const result = await this.pageViewModel.aggregate([
        { 
          $match: { 
            timestamp: { $gte: startDate, $lte: endDate },
            country: { $exists: true, $ne: null }
          } 
        },
        {
          $group: {
            _id: '$country',
            views: { $sum: 1 },
            unique_visitors: { $addToSet: '$sessionId' }
          }
        },
        {
          $project: {
            country: '$_id',
            views: 1,
            unique_visitors: { $size: '$unique_visitors' }
          }
        },
        { $sort: { views: -1 } }
      ]);

      return result;
    } catch (error) {
      this.logger.error('Failed to get traffic by country', error);
      throw error;
    }
  }

  private async getHourlyTraffic(startDate: Date, endDate: Date): Promise<any[]> {
    try {
      const result = await this.pageViewModel.aggregate([
        { $match: { timestamp: { $gte: startDate, $lte: endDate } } },
        {
          $group: {
            _id: {
              year: { $year: '$timestamp' },
              month: { $month: '$timestamp' },
              day: { $dayOfMonth: '$timestamp' },
              hour: { $hour: '$timestamp' }
            },
            page_views: { $sum: 1 },
            unique_visitors: { $addToSet: '$sessionId' }
          }
        },
        {
          $project: {
            hour: {
              $dateFromParts: {
                year: '$_id.year',
                month: '$_id.month',
                day: '$_id.day',
                hour: '$_id.hour'
              }
            },
            page_views: 1,
            unique_visitors: { $size: '$unique_visitors' }
          }
        },
        { $sort: { hour: 1 } }
      ]);

      return result;
    } catch (error) {
      this.logger.error('Failed to get hourly traffic', error);
      throw error;
    }
  }
} 