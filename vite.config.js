import {
  defineConfig,
  splitVendorChunkPlugin
} from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import eslint from 'vite-plugin-eslint'
import electron from 'vite-electron-plugin'
import {
  copy as electronCopy,
  customStart as electronCustomStart,
  loadViteEnv as electronLoadViteEnv
} from 'vite-electron-plugin/plugin'
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
      electron(
        {
          include: [
            'electron'
          ],
          outDir: 'build_electron',
          plugins: [
            electronCopy(
              [
                {
                  from: 'electron/plugins/i18n/locales/*.json',
                  to: 'build_electron/plugins/i18n/locales'
                }
              ]
            ),
            electronCustomStart(
              () => false
            ),
            electronLoadViteEnv()
          ]
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
      ),
      splitVendorChunkPlugin()
    ],
    resolve: {
      alias: {
        '@': resolvePath(
          __dirname,
          './src'
        ),
        'vue-i18n':
          'vue-i18n/dist/vue-i18n.cjs.js'
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
