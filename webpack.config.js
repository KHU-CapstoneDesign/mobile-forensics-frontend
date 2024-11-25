const path = require('path');

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
  // Webpack 모드 설정
  mode: 'development',

  // 엔트리 포인트
  entry: './src/index.js',

  // 출력 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // Node.js 모듈 설정
  resolve: {
    fallback: {
      fs: false, // fs 모듈 비활성화
      path: require.resolve('path-browserify'), // path 브라우저 대체
    },
  },
  // resolve: {
  //   alias: {
  //     'react/jsx-runtime': 'react/jsx-runtime.js',
  //   },
  // },
};
