const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '*': path.resolve(
          __dirname, './src'
        ),
        '@': path.resolve(
          __dirname, './src/components'
        ),
        '#': path.resolve(
          __dirname, './src/helpers'
        ),
        '%': path.resolve(
          __dirname, './src/views'
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
  outputDir: 'build'
}
