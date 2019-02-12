const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = env => merge(common(env), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../build/test')
    }
});