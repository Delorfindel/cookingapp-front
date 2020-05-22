const withImages = require('next-images');

module.exports = withImages({
  webpack(config, options) {
    const rules = [
      {
        test: /\.(woff|woff2|ttf)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ];
    return {
      ...config,
      module: {
        ...config.module,
        rules: [...config.module.rules, ...rules],
      },
    };
  },
});
