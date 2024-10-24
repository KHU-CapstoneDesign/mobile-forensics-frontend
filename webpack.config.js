{
  [
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
      test: /\.(svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext][query]',
          },
        },
      ],
    },
    { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
  ];
}
