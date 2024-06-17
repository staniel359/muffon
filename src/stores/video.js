import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isAutoplay: null,
      isPauseOnAudioPlay: null,
      isOpenLinksInNewTab: null
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
    },
    setIsOpenLinksInNewTab (
      value
    ) {
      this.isOpenLinksInNewTab = value
    }
  }
}

export default defineStore(
  'video',
  data
)
