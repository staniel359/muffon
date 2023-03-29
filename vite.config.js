import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import eslint from 'vite-plugin-eslint'
import electronRenderer from 'vite-plugin-electron-renderer'
import {
  resolve as resolvePath
} from 'path'

export default defineConfig(
  {
    plugins: [
      vue(),
      inject(
        {
          $: 'jquery',
          jQuery: 'jquery'
        }
      ),
      eslint(),
      electronRenderer(
        {
          resolve: {
            'discord-rpc': () => (
              {
                platform: 'node'
              }
            )
          }
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
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `
            @import './src/assets/styles/Shared.sass'
          `
        }
      }
    },
    build: {
      outDir: 'build',
      target: 'esnext'
    }
  }
)
