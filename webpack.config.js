

var path  = require('path');
//https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports ={
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'src/public')
    },
    resolve:{
        alias:{
            vue:'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: path.join(__dirname,'src')
            },
            { test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader|server/
            },
          {test: /\.css$/,
             /* exclude: /node_modules/,*/
              use:ExtractTextPlugin.extract({
                 fallback: "style-loader",
                 use: "css-loader"
             })
             /*use: [
               'style-loader',
              'css-loader'
             ]*/
          },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            },
            {
                test: /\.(woff|ttf|eot|svg)/,
                loader: 'file-loader?name=font/[name].[ext]&publicPath=/'/*&outputPath=font/*/
            },
            /*{
                test:/\.css$/,
                loader:'style-loader!css-loader'
            }*/
          /*  {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath:path.join(__dirname,'src/public')
                })
            }*/]
    },
    plugins: [
        new ExtractTextPlugin({//
            filename:"common1.css",
            allChunks:true,
            disable:false
        }),
        /*new webpack.optimize.CommonsChunkPlugin({
            names: ['vue', 'common'],
            filename: 'src/public/js/[name].[chunkhash:8].js',
            minChunks: Infinity
        })*/
    ]
}