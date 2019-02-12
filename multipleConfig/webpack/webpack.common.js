const path = require('path');
const webpack = require('webpack');
// 插件实现自动编写和配置index.html，将打包后的js引入到index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// console.log('__dirname: ', __dirname);
module.exports = () => {
    return {
        // 指定入口文件，程序从这里开始编译，__dirname是当前所在目录
        // []形式下是将多个文件达成一个js
        // entry: path.resolve(__dirname, '../src/index.js'),
        entry: {
            'index': [
                'babel-polyfill',
                path.resolve(__dirname, '../src/index.js')
            ]
        },
        // 指定输出的路径
        output: {
            filename: 'js/[name].js', // 打包后文件名 默认名字为main
            // filename: 'bundle.js'
            // filename: 'app/[name]_[hash:8].js'
            // publicPath: '/'
        },
        // 预设选项，可作为快捷方式
        stats: {
            maxModules: 0, // 设置要显示的模块的最大数量
            modules: false, // 添加构建模块信息
            assets: false // 添加资源信息
        },
        module: {
            /**
             * css-loader: 解析css代码
             * style-loader: 将编译后css样式导入到html中
             * less-loader: 加载和转移less文件
             * raw-loader: 加载文件原始内容（utf-8格式）
             * url-loader: 多用于加载图片
             * file-loader: 打包文件
             */
            rules: [
                // 编译前启用eslint检查代码格式
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: [ // 需要什么样的loader去编译文件
                            { loader: 'css-loader', options: { importLoaders: 1 } },
                            { loader: 'postcss-loader' }
                        ],
                        fallback: 'style-loader' // 编译后用什么loader来提取css文件
                    })
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({
                        use: [
                            { loader: 'postcss-loader' },
                            { loader: 'less-loader' }
                        ],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'static/imgs/'
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|eot|ttf)\??.*$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/'
                    }
                }
            ]
        },
        plugins: [
            // 设置热更新
            new webpack.HotModuleReplacementPlugin(),
            // new ExtractTextPlugin({
            //     filename: (getPath) => {
            //         return getPath('style/[name].css').replace('js/', '');
            //     },
            //     allChunks: true
            // }),
            new HtmlWebpackPlugin({
                // title: 'ads', // 用于生成的HTML文档的标题
                filename: 'index.html', // 要将HTML写入的文件。默认为index.html。可以在这里指定一个子目录（如：assets/admin.html）
                template: path.resolve(__dirname, '../src/index.html'), // webpack需要模板的路径
                inject: true, // 将所有资源注入给定模版中 true || 'body'加入到body底部, 'head'加入到head中, 'false'不自动注入
                // favicon: '../src/resource/img/icon.ico', // 添加特定的 favicon 路径到输出的 HTML 文件中
                minify: { // {} | false, 传递 html-minifier 选项给 minify 输出
                    removeAttributeQuotes: true, // 尽可能删除属性周围的引号
                    minifyCSS: true, //在样式元素和样式属性中缩小CSS（使用clean-css）
                    minifyJS: true, // 缩小脚本元素和事件属性中的JavaScript（使用UglifyJS）
                    collapseWhitespace: true, // 折叠文档树中文本节点的空白区域
                    removeComments: true // 去除注释
                }
                // hash: true, // false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用
                // cache: true, // true, 如果为true, 仅仅在文件修改之后才会发布文件
                // showErrors: false, // true, 如果为true, 错误信息会写入到 HTML 页面中
            })
        ]
    };
};
