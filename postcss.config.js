module.exports = {
  plugins: {
    tailwindcss: {},
    // ...(process.env.NODE_ENV === 'production'
    //   ? {
    //     '@fullhuman/postcss-purgecss': {
    //       content: ['./src/**/*.js', './src/**/*.tsx'],
    //       defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    //     },
    //     autoprefixer: {},
    //   }
    //   : {}),
  },
};
