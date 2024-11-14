module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        // Add your svg loader configuration here
      },
    ],
  },
  // resolve: {
  //   alias: {
  //     'react/jsx-runtime': 'react/jsx-runtime.js',
  //   },
  // },
};
