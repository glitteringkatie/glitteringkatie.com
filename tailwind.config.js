module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        mint: '#89AA88',
        fern: '#637D59',
        deciduous: '#2D5E2C',
        pine: '#004225',
        salmon: '#FFCBA4',
        cream: '#FEF9F1',
        dimGray: '#575552',
        warmBlack: '#100E0E',
      },
      fontFamily: {
        serif: ['Source Serif Pro', 'serif'],
        sans: ['Work Sans', 'sans-serif'],
        code: ['Fira Mono', 'monospace'],
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        blob: "url('/assets/home/blob.png')",
      },
      backgroundSize: {
        stretch: '100% 100%',
      },
      height: {
        unset: 'unset !important',
      },
      position: {
        unset: 'unset !important',
      },
    },
  },
};
