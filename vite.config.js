import {
  defineConfig
} from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import {
  resolve as resolvePath
} from 'node:path'

export default defineConfig(
  {
    plugins: [
      vuePlugin(
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
      eslintPlugin(
        {
          emitWarning: false,
          emitError: false,
          failOnWarning: false,
          failOnError: false
        }
      )
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
      target: 'esnext',
      rolldownOptions: {
        transform: {
          inject: {
            $: 'jquery',
            jQuery: 'jquery'
          }
        }
      }
    }
  }
)
