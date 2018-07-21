var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = environment => {
	const isProd = 'production'.indexOf(environment) !== -1;
	return {
		entry:  path.join(__dirname, 'src', 'index.tsx'),
		output: {
			filename: 'bundle.js',
			path: path.join(__dirname, 'dist')
		},
		devtool: 'source-map',
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json']
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
				{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
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
