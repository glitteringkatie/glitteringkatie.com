import {useEffect} from 'react'
import {useRouter} from 'next/router'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/index.css'
import {pageView} from '../lib/gtag';

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

  return (<>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'></link>
      <link href="https://fonts.googleapis.com/css2?family=Fira+Mono&family=Source+Serif+Pro:ital,wght@0,600;1,400&family=Work+Sans:wght@200;400&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </>)
}
