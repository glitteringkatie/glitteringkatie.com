import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import '../styles/index.css';
import { pageView } from '../lib/gtag';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Hook to call the Google Analytics pageview function when the URL of the page is updated
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
