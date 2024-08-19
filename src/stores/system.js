import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isWithCache: null,
      isAutoupdateAvailable: null,
      isWithAutoupdate: null
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
      this.isAutoupdateAvailable = value
    },
    setIsWithAutoupdate (
      value
    ) {
      this.isWithAutoupdate = value
    }
  }
}

export default defineStore(
  'system',
  data
)
