const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:'./src/index.js',

    output: {
        // filename:'bundle.[contenthash].js',
        filename:'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
    },

    mode:'development',

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9000
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg)$/,
                use: ['file-loader']
            },

            {
                test: /\.(css)$/,
                use:['style-loader', 'css-loader']
                // use:[MiniCssExtractPlugin.loader, 'css-loader']
            },

            {
                test: /\.(scss)$/,
                use:['style-loader', 'css-loader', 'sass-loader']
                // use:[MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },

            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['transform-class-properties']
                    }
                }
            },

            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },

    plugins:[
        // new TerserPlugin(),
        // new MiniCssExtractPlugin({
            // filename: 'style.[contenthash].css'
        //     filename: 'style.[contenthash].css'
        // }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                //default: '**/*'

                '**/*',
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.hbs',
            title: 'Hello world',
            filename: 'subfolder/custom_filename.html',
            meta: {
                description: 'some description'
            }
        })
    ]
};