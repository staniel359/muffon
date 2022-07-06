const path = require(
  'path'
)
const webpack = require(
  'webpack'
)

module.exports = {
  configureWebpack: {
    externals: {
      'react-native-fs': 'reactNativeFs'
    },
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
        '*': path.resolve(
          __dirname,
          './src'
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
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      fullInstall: false
    }
  },
  publicPath: './'
}
