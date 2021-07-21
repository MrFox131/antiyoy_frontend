const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(js)$/, use: 'babel-loader'}
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    mode:"development"
}