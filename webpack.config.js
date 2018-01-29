const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css打包成一个文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "css/style.css"
});

module.exports = {
    devtool: 'eval-source-map',
    entry:  {
        app:__dirname + "/src/main.js",
        // 第三方库(vendor) 入口
        // vendors:['art-template']
    },//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "js/bundle.js",//打包后输出文件的文件名
        publicPath: "/static/"
    },
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        // hot: true,//热模块替换
        publicPath: "/static/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //打包除这个文件之外的文件
                exclude: path.resolve(__dirname,"./node_modules"),
            },
            {
                test: /\.(scss|css)$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader",
                    }, {
                        loader: "sass-loader"
                    }],
                })
            },
            {
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    // art-template options (if necessary)
                    // @see https://github.com/aui/art-template
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[ext]',
                }
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载
        new CleanWebpackPlugin(['build/bundle-*.js'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),//去除打包后的build文件中的残余文件
        // new HtmlWebpackPlugin({
        //     template: 'html-withimg-loader!'+path.resolve(static, 'xxx.html'),
        //     filename: 'xxx.html'
        // })
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //
        // }),//这个可以使jquery变成全局变量，妮不用在自己文件require('jquery')了
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')//这是妮第三方库打包生成的文件
    ],
    // 配置模块如何解析。
    resolve: {
        // 创建 import 或 require 的别名
        alias:{
            'scss':path.resolve(__dirname,'./src/common/scss'),
            'plugins':path.resolve(__dirname,'./src/plugins'),
            'tpl':path.resolve(__dirname,'./src/common/tpl'),
        }
    }
}