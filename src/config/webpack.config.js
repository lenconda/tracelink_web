const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('./config');

function getEntries(searchPath, root) {
  const files = glob.sync(searchPath);
  const entries = files.map((value, index) => {
    const relativePath = path.relative(root, value);
    return {
      name: value.split('/')[value.split('/').length - 2],
      path: path.resolve('./', value),
      route: relativePath.split('/').filter((value, index) => value !== 'index.tsx').join('/')
    };
  });
  return entries;
}

module.exports.getEntries = getEntries;

const pages = {
  'create': {
    template: 'create.html',
    title: 'Create | ' + config.name
  },
  'records': {
    template: 'records.html',
    title: 'Records | ' + config.name
  },
  'records/detail': {
    template: 'record_detail.html',
    title: 'Record Detail | ' + config.name
  }
};

const entries = getEntries(
  path.join(__dirname, '../pages/**/index.tsx'),
  path.join(__dirname, '../pages')
);

module.exports = {
  entry: {
    ...Object.assign(...entries.map((value, index) => {
      const entryObject = {};
      entryObject[value.name === 'pages' ? 'index' : value.name] = value.path;
      return entryObject;
    }))
  },
  output: {
    path: path.join(
      __dirname,
      (config.isDev ? '../../' : '../../dist/') + 'server-bundle'
    ),
    filename: 'static/js/[name]-route.[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|js|tsx|jsx)?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            },
          },
          {
            test: /\.(ts|js|tsx|jsx)?$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve('babel-preset-react-app/webpack-overrides'),
              cacheDirectory: true,
              cacheCompression: true,
              compact: true,
            }
          },
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    ...entries.map((value, index) => {
      return new HtmlWebpackPlugin({
        filename: path.join(
          __dirname,
          (config.isDev ? '../../' : '../../dist/') + 'server-templates/',
          value.route === '' ? 'index.html' : value.route + '/index.html'
        ),
        template:
          path.resolve(
            __dirname,
            '../templates/' + (pages[value.route] && (pages[value.route].template || 'index.html') || 'index.html')
          ),
        templateParameters: {
          title: pages[value.route] && (pages[value.route].title || config.name) || config.name
        },
        inject: true,
        chunks: [value.name === 'pages' ? 'index' : value.name]
      });
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    }),
    new TerserWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../assets/'),
        to: path.resolve(__dirname, (config.isDev ? '../../' : '../../dist/') + 'server-bundle/assets')
      },
      {
        from: path.resolve(__dirname, '../templates/redirect.html'),
        to: path.resolve(__dirname, (config.isDev ? '../../' : '../../dist/') + 'server-templates/redirect.html')
      }
    ]),
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
