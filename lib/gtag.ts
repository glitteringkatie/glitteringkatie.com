// Export the Google Analytics Tracking ID for the development environment or production environment
export const GA_TRACKING_ID: string = process.env.GOOGLE_ANALYTICS_TRACKING_ID || '';

//Track page views by sending GA the GA Tracking ID and URL to the current page
export const pageView = (url: URL): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};