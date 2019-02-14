const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = env => merge(common(env), {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../build/dev'),
        pathinfo: false // 告知 webpack 在 bundle 中引入「所包含模块信息」的相关注释,prod下默认false
    },
    devServer: {
        stats: {
            maxModules: 0,
            modules: false
        },
        contentBase: path.resolve(__dirname, '../build'),
        host: '127.0.0.1',
        port: 9001,
        inline: true,
        open: true,
        hot: true, // 开启热模块替换
        historyApiFallback: true // 404的页面会自动跳转到/页面
    },
    watchOptions: {
        // 不监听这些文件
        ignored: /node_modules/
    },
    devtool: 'cheap-module-source-map'
});