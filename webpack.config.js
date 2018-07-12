module.exports = (environment) => {
    const isProd = 'production'.indexOf(environment) !== -1;
    return {
        entry: './index.tsx',
        output: {
            filename: 'bundle.js',
            path: __dirname + '/dist'
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        module: {
            rules: [
                { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ].concat(isProd ? [] : [{ test: /\.tsx?$/, exclude: /node_modules/, loader: "tslint-loader" }])
        }
    }
}