import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue()
  ],
  base: './',
  build: {
    outDir: 'build'
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import './src/assets/styles/Shared.sass'`
      }
    }
  },
  resolve: {
    alias: {
      '*': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src/components'),
      '#': resolve(__dirname, './src/helpers'),
      '$': resolve(__dirname, './src/views'),
    }
  }
})
