import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isAutoplay: null,
      isPauseOnAudioPlay: null
    }
  },
  actions: {
    setIsAutoplay (
      value
    ) {
      this.isAutoplay = value
    },
    setIsPauseOnAudioPlay (
      value
    ) {
      this.isPauseOnAudioPlay = value
    }
  }
}

export default defineStore(
  'video',
  data
)
