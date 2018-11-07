const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config');
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              // name: 'resources/[path][name]-[hash:8].[ext]'
              name: 'assests/images/[name]-[hash:8].[ext]'
            }
          }
        ]
      },
      {
				test:/\.css$/,
				loaders:ExtractPlugin.extract({
					//转换.css文件需要使用的Loader
					use:['css-loader']//压缩css代码
				}),					
			}
    ]
  }
}

module.exports = config
