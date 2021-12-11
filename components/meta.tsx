import Head from 'next/head'
import { HOME_OG_IMAGE_URL } from '../lib/constants'

type Props = {
  ownImage?: boolean
  ownTitle?: boolean
}

const Meta = ({ownImage, ownTitle}: Props) => {
  return (
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GOOGLE_ANALYTICS_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        property="og:description"
        content="A tech and lifestyle blog by Katie Hughes"
      />
      <meta property="og:type" content="website" />
      {ownImage ? null : <meta property="og:image" content='/assets/unfurl.png' />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content='@glitteringkatie' />
      {ownTitle ? null : <meta property="og:title" content="glittering katie" />}
    </Head>
  )
}

export default Meta
