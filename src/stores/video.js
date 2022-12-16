import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isAutoplay: false
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
