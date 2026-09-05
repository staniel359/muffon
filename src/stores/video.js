import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isAutoplay: null,
      isPauseOnAudioPlay: null,
      isOpenLinksInNewTab: null,
      isWithPlayingFocus: null
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
    },
    setIsWithPlayingFocus (
      value
    ) {
      this.isWithPlayingFocus = value
    }
  }
}

export default defineStore(
  'video',
  data
)
