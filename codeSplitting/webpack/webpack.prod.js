const merge = require('webpack-merge');
const path = require('path');
// 压缩JavaScript代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = env => merge(common(env), {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../build/dist')
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: 4, // 启用多进程并行运行并设置并发运行次数
                // exclude: /compress/,
                uglifyOptions: {
                    output: { // 输出选项
                        comments: false // 传递true或'all'保留所有注释
                    },
                    compress: { // 压缩选项
                        drop_console: true // 放弃对console.*函数的调用
                        // drop_debugger: true // true, 删除debugger;语句
                    }
                }
            })
        ]
    }
});