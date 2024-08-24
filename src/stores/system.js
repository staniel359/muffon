import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isWithCache: null,
      isAutoupdateSupported: null,
      willAutoupdate: null
    }
  },
  actions: {
    setIsWithCache (
      value
    ) {
      this.isWithCache = value
    },
    setIsAutoupdateAvailable (
      value
    ) {
      this.isAutoupdateSupported = value
    },
    setIsWithAutoupdate (
      value
    ) {
      this.willAutoupdate = value
    }
  }
}

export default defineStore(
  'system',
  data
)
