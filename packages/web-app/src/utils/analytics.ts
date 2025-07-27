import { v4 as uuidv4 } from 'uuid';

export interface PageViewData {
  sessionId: string;
  userId?: string;
  pageUrl: string;
  pageTitle: string;
  referrer?: string;
  screenResolution?: string;
  language: string;
  duration?: number;
}

class Analytics {
  private sessionId: string;
  private startTime: number = 0;
  private apiEndpoint: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.apiEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_API || 'http://localhost:3003/api/analytics';
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return '';
    
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private getUserId(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.id || user._id;
      } catch (error) {
        return undefined;
      }
    }
    return undefined;
  }

  private getScreenResolution(): string {
    if (typeof window === 'undefined') return '';
    return `${window.screen.width}x${window.screen.height}`;
  }

  private getLanguage(): string {
    if (typeof window === 'undefined') return 'en';
    return navigator.language || 'en';
  }

  private getReferrer(): string | undefined {
    if (typeof document === 'undefined') return undefined;
    return document.referrer || undefined;
  }

  trackPageView(pageUrl?: string, pageTitle?: string): void {
    if (typeof window === 'undefined') return;

    this.startTime = Date.now();
    
    const data: PageViewData = {
      sessionId: this.sessionId,
      userId: this.getUserId(),
      pageUrl: pageUrl || window.location.pathname + window.location.search,
      pageTitle: pageTitle || document.title,
      referrer: this.getReferrer(),
      screenResolution: this.getScreenResolution(),
      language: this.getLanguage(),
    };

    this.sendTrackingData(data);
  }

  trackPageExit(): void {
    if (typeof window === 'undefined' || this.startTime === 0) return;

    const duration = Math.round((Date.now() - this.startTime) / 1000);
    
    const data: PageViewData = {
      sessionId: this.sessionId,
      userId: this.getUserId(),
      pageUrl: window.location.pathname + window.location.search,
      pageTitle: document.title,
      referrer: this.getReferrer(),
      screenResolution: this.getScreenResolution(),
      language: this.getLanguage(),
      duration,
    };

    // Use sendBeacon for reliable tracking on page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        `${this.apiEndpoint}/track`,
        JSON.stringify(data)
      );
    } else {
      this.sendTrackingData(data, true);
    }
  }

  private async sendTrackingData(data: PageViewData, isSync: boolean = false): Promise<void> {
    try {
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      };

      // if (isSync) {
      //   options.keepalive = true;
      // }

      await fetch(`${this.apiEndpoint}/track`, options);
    } catch (error) {
      console.warn('Failed to send analytics data:', error);
    }
  }

  setUserId(userId: string): void {
    // This can be called when user logs in
    if (typeof window !== 'undefined') {
      localStorage.setItem('analytics_user_id', userId);
    }
  }

  clearSession(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('analytics_session_id');
      localStorage.removeItem('analytics_user_id');
      this.sessionId = this.getOrCreateSessionId();
    }
  }
}

// Create singleton instance
const analytics = new Analytics();

export default analytics; 