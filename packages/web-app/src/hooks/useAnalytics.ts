import { useEffect } from 'react';
import { useRouter } from 'next/router';
import analytics from '../utils/analytics';

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      analytics.trackPageView(url);
    };

    const handleBeforeUnload = () => {
      analytics.trackPageExit();
    };

    // Track initial page view
    analytics.trackPageView();

    // Track route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Track page exit
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router.events]);

  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackPageExit: analytics.trackPageExit.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
    clearSession: analytics.clearSession.bind(analytics),
  };
}; 