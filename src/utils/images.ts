export const DEFAULT_COVER_IMAGES = Array.from(
  { length: 14 },
  (_, i) => `/assets/blog/default${i + 1}.jpeg`
);

export const getRoundRobinImage = (index: number) =>
  DEFAULT_COVER_IMAGES[index % DEFAULT_COVER_IMAGES.length];
