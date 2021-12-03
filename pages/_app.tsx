import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'></link>
      <link href="https://fonts.googleapis.com/css2?family=Fira+Mono&family=Source+Serif+Pro:ital,wght@0,600;1,400&family=Work+Sans:wght@200;400&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </>)
}
