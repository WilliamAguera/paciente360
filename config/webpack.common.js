const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const entries = () => {
  const routes = glob.sync('./public/js/routes.js');
  const controllers = glob.sync('./public/js/controllers/**/*.js');
  const services = glob.sync('./public/js/services/**/*.js');
  return routes.concat(controllers, services);
};

module.exports = {
  entry: {
    main: ['babel-runtime/regenerator', 'babel-register', './public/main.js', ...entries()],
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './public/views', to: 'views' },
        { from: './node_modules/angular-toastr/dist/angular-toastr.css', to: 'angular-toastr.css' },
      ],
    }),
    new HTMLWebpackPlugin({
      template: './public/views/index.html',
      title: 'Webpack: AngularJS configuration',
      inject: 'body',
    }),

  ],
  performance: {
    hints: false,
  }
};
