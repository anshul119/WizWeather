var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = environment => {
	const isProd = 'production'.indexOf(environment) !== -1;
	return {
		entry: path.join(__dirname, 'src', 'index.tsx'),
		output: {
			filename: 'bundle.js',
			path: path.join(__dirname, 'dist')
		},
		devtool: 'source-map',
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json'],
			alias: {
				apis: path.join(__dirname, 'src', 'apis'),
				assets: path.join(__dirname, 'src', 'assets'),
				configs: path.join(__dirname, 'src', 'configs'),
				containers: path.join(__dirname, 'src', 'containers'),
				components: path.join(__dirname, 'src', 'components'),
				models: path.join(__dirname, 'src', 'models'),
				services: path.join(__dirname, 'src', 'services'),
				styles: path.join(__dirname, 'src', 'styles')
			}
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx|js)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['es2015', 'react'],
								plugins: [isProd ? [] : ['react-hot-loader/babel']]
							}
						},
						{
							loader: 'ts-loader'
						}
					]
				},
				{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
				{
					test: /\.(eot|ttf|woff|woff2)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'assets/fonts/[hash].[ext]'
							}
						}
					]
				},
				{
					test: /\.css$/,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'csso-loader' },
						{
							loader: 'postcss-loader',
							options: {
								plugins: loader => [
									require('postcss-url')({
										url: 'inline'
									})
								]
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader' },
						{
							loader: 'postcss-loader',
							options: {
								plugins: loader => [
									require('autoprefixer')({
										browsers: '>1%, ie>=11, not op_mini all'
									})
								]
							}
						},
						{ loader: 'sass-loader' }
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'assets/[hash].[ext]'
							}
						}
					]
				}
			].concat(isProd ? [] : [{ test: /\.tsx?$/, exclude: /node_modules/, loader: 'tslint-loader' }])
		},
		plugins: [
			new HtmlWebpackPlugin(
				Object.assign(
					{
						filename: 'index.html',
						template: path.join(__dirname, 'src', 'index.html'),
						minify: isProd
							? {
									collapseInlineTagWhitespace: true,
									collapseWhitespace: true,
									sortAttributes: true,
									sortClassName: true
							  }
							: false
					},
					isProd ? { filename: path.join(__dirname, 'dist', 'index.html') } : null
				)
			),
			new FaviconsWebpackPlugin({
				logo: './src/assets/favicon.png',
				inject: true,
				icons: {
					android: true,
					appleIcon: false,
					appleStartup: false,
					coast: false,
					favicons: true,
					firefox: false,
					opengraph: false,
					twitter: false,
					yandex: false,
					windows: false
				}
			}),
		],
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			publicPath: '/',
			port: 8080,
			stats: {
				color: true
			}
		}
	};
};
