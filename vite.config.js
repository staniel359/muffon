import {
  defineConfig,
  splitVendorChunkPlugin
} from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import eslint from 'vite-plugin-eslint'
import electronRenderer from 'vite-plugin-electron-renderer'
import {
  resolve as resolvePath
} from 'node:path'

export default defineConfig(
  {
    plugins: [
      vue(
        {
          template: {
            compilerOptions: {
              isCustomElement: tag => {
                return [
                  'emoji-picker'
                ].includes(
                  tag
                )
              }
            }
          }
        }
      ),
      inject(
        {
          $: 'jquery',
          jQuery: 'jquery'
        }
      ),
      eslint(),
      electronRenderer(),
      splitVendorChunkPlugin()
    ],
    resolve: {
      alias: {
        '@': resolvePath(
          __dirname,
          './src'
        )
      }
    },
    server: {
      port: 3000
    },
    build: {
      outDir: 'build',
      target: 'esnext'
    }
  }
)
