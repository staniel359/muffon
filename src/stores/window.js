import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isMaximizeOnStart: null,
      isExitOnClose: null,
      isWithTrayIcon: null
    }
  },
  actions: {
    setIsMaximizeOnStart (
      value
    ) {
      this.isMaximizeOnStart = value
    },
    setIsExitOnClose (
      value
    ) {
      this.isExitOnClose = value
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
