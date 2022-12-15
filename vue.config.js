const webpack = require(
  'webpack'
)
const path = require(
  'path'
)

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.txt$/i,
          use: 'raw-loader'
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin(
        {
          $: 'jquery',
          jQuery: 'jquery'
        }
      )
    ],
    resolve: {
      alias: {
        '#': path.join(
          __dirname,
          './shared'
        )
      }
    },
    target: 'electron-renderer'
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "./src/assets/styles/Shared.sass"'
      }
    }
  },
  devServer: {
    port: 3000
  },
  outputDir: 'build',
  publicPath: './'
}
