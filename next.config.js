/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images');

module.exports = withImages({
  ignoreTypes: ['svg'],
  images: {
    disableStaticImages: true,
  },
  env: {
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  },
  async rewrites() {
    return [
      { source: '/bookmarks',  destination: '/bookmarks/index.html' },
      { source: '/bookmarks/', destination: '/bookmarks/index.html' },
    ];
  },
});
