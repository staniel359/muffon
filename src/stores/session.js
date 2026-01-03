import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isGuest: null
    }
  },
  actions: {
    setIsGuest (
      value
    ) {
      this.isGuest = value
    }
  }
}

export default defineStore(
  'session',
  data
)
