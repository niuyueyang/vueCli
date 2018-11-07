const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const merge=require("webpack-merge");
const vueSSRClient = require('vue-server-renderer/client-plugin')

//开发环境
const isDev = process.env.NODE_ENV === 'development';
const baseConfig=require("./webpack.config.base");

let congig;
const devServer = {
    port: 8001,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true,
    historyApiFallback:{
    	index:'/index.html'
    }
}
const defaultPlugins=[
 	new webpack.DefinePlugin({
  		'process.env': {NODE_ENV: isDev ? '"development"' : '"production"' }
    }),
    new HTMLPlugin({
    	template:path.join(__dirname,"../index.html")
    }),
    new vueSSRClient()
];
if (isDev) {
	config=merge(baseConfig,{
		devtool : '#cheap-module-eval-source-map',
		module:{
			rules:[

			]
		},
		devServer,
		plugins:defaultPlugins.concat([
			 new webpack.HotModuleReplacementPlugin(),
    		 new webpack.NoEmitOnErrorsPlugin(),
    		 new ExtractPlugin({
				filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
				disable: false,
				allChunks: true
			}),
		])
	})
} else {
	//生产环境
	config=merge(baseConfig,{
		entry :{
		    app: path.join(__dirname, '../client/index.js'),
		    vendor: ['vue']
		},
		output:{
			filename:'js/[name].[chunkhash:8].js',
			
		},
		module:{
			rules:[]
		},
		plugins:defaultPlugins.concat([
			new ExtractPlugin({
				filename: "css/[name].css",
				disable: false,
				allChunks: false
			}),
		    new webpack.optimize.CommonsChunkPlugin({
		      name: 'vendor'
		    }),
		    new webpack.optimize.CommonsChunkPlugin({
		      name: 'runtime'
		    })
		])
	})
}
module.exports = config
