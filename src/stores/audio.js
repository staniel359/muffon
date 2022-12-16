import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      element: null,
      context: null,
      source: null,
      isAutoplay: false,
      isLoop: false,
      isMuted: false,
      isPlayable: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
      volume: 1,
      status: 'stop'
    }
  },
  getters: {
    action (
      state
    ) {
      const statusActions = {
        play: 'pause',
        pause: 'play',
        stop: 'play'
      }

      return statusActions[
        state.status
      ]
    }
  },
  actions: {
    setElement (
      value
    ) {
      this.element = value
    },
    setContext (
      value
    ) {
      this.context = value
    },
    setSource (
      value
    ) {
      this.source = value
    },
    setDuration (
      value
    ) {
      this.duration = value
    },
    setProgress (
      value
    ) {
      this.progress = value
    },
    setIsPlayable (
      value
    ) {
      this.isPlayable = value
    },
    setStatus (
      value
    ) {
      this.status = value
    },
    setCurrentTime (
      value
    ) {
      this.currentTime = value
    },
    setVolume (
      value
    ) {
      this.volume = value
    },
    setIsMuted (
      value
    ) {
      this.isMuted = value
    },
    setIsLoop (
      value
    ) {
      this.isLoop = value
    },
    setIsAutoplay (
      value
    ) {
      this.isAutoplay = value
    }
  }
}

export default defineStore(
  'audio',
  data
)
