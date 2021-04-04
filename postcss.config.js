module.exports = {
  purge: [
    './layouts/**/*.html',
    './content/**/*.*',
  ],
  plugins: {
    '@fullhuman/postcss-purgecss': {
      content: [
        './layouts/**/*.html',
        './content/**/*.html',
        './themes/sf-theme/**/*.html',
      ],
    },
    autoprefixer: {},
  },
};
