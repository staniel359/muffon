const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  output: {
    filename: './bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    watchContentBase: true,
    stats: 'errors-warnings'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      styles: path.resolve(__dirname, 'src/styles'),
      global: path.resolve(__dirname, 'src/components/global'),
      contexts: path.resolve(__dirname, 'src/contexts')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  target: 'electron-renderer'
}
