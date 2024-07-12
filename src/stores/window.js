import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isMaximizeOnStart: null,
      isQuitOnClose: null,
      isWithTrayIcon: null
    }
  },
  actions: {
    setIsMaximizeOnStart (
      value
    ) {
      this.isMaximizeOnStart = value
    },
    setIsQuitOnClose (
      value
    ) {
      this.isQuitOnClose = value
    },
    setIsWithTrayIcon (
      value
    ) {
      this.isWithTrayIcon = value
    }
  }
}

export default defineStore(
  'window',
  data
)
