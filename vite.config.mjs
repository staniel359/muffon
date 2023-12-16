import {
  defineConfig,
  splitVendorChunkPlugin
} from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import eslint from 'vite-plugin-eslint'
import electron from 'vite-electron-plugin'
import {
  alias as electronAlias,
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
            electronAlias(
              [
                {
                  find: '#',
                  replacement: resolvePath(
                    __dirname,
                    'electron'
                  )
                }
              ]
            ),
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
