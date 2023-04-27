import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isAutoplay: null
    }
  },
  actions: {
    setIsAutoplay (
      value
    ) {
      this.isAutoplay = value
    }
  }
}

export default defineStore(
  'video',
  data
)
