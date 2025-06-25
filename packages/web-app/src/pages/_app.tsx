import type { AppProps } from 'next/app';
// @ts-ignore
import { appWithTranslation } from 'next-i18next';
import { useAnalytics } from '../hooks/useAnalytics';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics();
  
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp); 