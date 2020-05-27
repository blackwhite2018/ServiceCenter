const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let isDevMode;

const webpackOptions = {
	entry: {
		app: './src/js/index.js'
	},

	output: {
		filename: 'js/[name].min.js',
		path: path.resolve(__dirname, './dist')
	},

	module: {
		rules: [
			// Транспил js с babel
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},

			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'src/js/postcss.config.js'
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},

			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'src/js/postcss.config.js'
							}
						}
					}
				]
			},

			// Подключение шрифтов из css
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '../fonts/[name].[ext]'
				}
			},

			// Подключение картинок из css
			{
				test: /\.(svg|png|jpg|jpeg|webp|gif)$/,
				loader: 'file-loader',
				options: {
					name: '../img/[name].[ext]'
				}
			}
		]
	},

	plugins: [
		//new HtmlWebpackPlugin({
			//title: 'app',
			//template: './src/index.html',
			//meta: {
			//	'viewport': 'width=device-width, initial-scale=1'
			//},
			//inject: true,
			//minify: {
			//	removeComments: true,
			//	collapseWhitespace: false
			//}
		//}),

		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),

		new CopyWebpackPlugin([
			{
				from: './src/img',
				to: './img'
			},
			{
				from: './src/fonts',
				to: './fonts'
			}
		])
	]
};

const installOptionsProduction = () => {};

const installOptionsDevelopment = () => {
	webpackOptions['watch'] = true;
	webpackOptions['devServer'] = {
		overlay: true
	};
};

module.exports = (env, opt) => {
	isDevMode = opt.mode;
	opt.mode == 'production' ? installOptionsProduction() : installOptionsDevelopment();
	return webpackOptions;
};
