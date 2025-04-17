const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Определение режима production по переменной окружения или аргументу argv
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  // Устанавливаем publicPath на /providers/ только для production
  const publicPath = isProduction ? '/providers/' : '/';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      publicPath: publicPath,
      clean: true
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash:8][ext]'
          }
        }
      ]
    },
    devServer: {
      historyApiFallback: {
        index: '/',
        rewrites: [
          { from: /^\/$/, to: '/index.html' },
          { from: /^\/[^.]/, to: '/index.html' }
        ]
      },
      port: 3000,
      open: true,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        publicPath: publicPath,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }),
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: 'public',
            to: '',
            globOptions: {
              ignore: ['**/index.html', '**/favicon.ico']
            }
          }
        ]
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    }
  };
}; 