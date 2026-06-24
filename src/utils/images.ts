export const DEFAULT_COVER_IMAGES = Array.from(
  { length: 14 },
  (_, i) => `/assets/blog/default${i + 1}.jpeg`
);

export const getRandomDefaultImage = () =>
  DEFAULT_COVER_IMAGES[Math.floor(Math.random() * DEFAULT_COVER_IMAGES.length)];
