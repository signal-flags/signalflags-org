module.exports = {
  purge: ['layouts/**/*.html', 'content/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    // Responsive typography is not a good idea.
    // typography: [],
  },
  plugins: [
    require('@tailwindcss/typography')({
      modifiers: [],
    }),
  ],
};
