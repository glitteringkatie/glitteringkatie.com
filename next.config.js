const withImages = require('next-images');

module.exports = withImages({
  ignoreTypes: ["svg"],
  images: {
    disableStaticImages: true
  },
});