const webpack = require(
  'webpack'
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
  pluginOptions: {
    i18n: {
      enableLegacy: true
    }
  },
  publicPath: './'
}
