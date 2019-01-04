const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [ // 配置插件的节点
    new htmlWebpackPlugin({ // 创建一个 在内存中 生成 HTML  页面的插件
      template: path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
      filename: 'index.html' // 指定生成的页面的名称
    })
  ],
  module: {
    rules: [
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' },
    ]
  },
  resolve: {
    alias: {
      // "vue$": "vue/dist/vue.js"
    }
  }
}