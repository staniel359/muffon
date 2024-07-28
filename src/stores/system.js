import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isWithCache: null
    }
  },
  actions: {
    setIsWithCache (
      value
    ) {
      this.isWithCache = value
    }
  }
}

export default defineStore(
  'system',
  data
)
