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
      status: 'stop',
      isEqualizerEnabled: false,
      equalizers: [
        {
          key: 'lowshelf-30',
          type: 'lowshelf',
          frequency: 30,
          gain: 0
        },
        {
          key: 'peaking-60',
          type: 'peaking',
          frequency: 60,
          gain: 0
        },
        {
          key: 'peaking-125',
          type: 'peaking',
          frequency: 125,
          gain: 0
        },
        {
          key: 'peaking-250',
          type: 'peaking',
          frequency: 250,
          gain: 0
        },
        {
          key: 'peaking-500',
          type: 'peaking',
          frequency: 500,
          gain: 0
        },
        {
          key: 'peaking-1000',
          type: 'peaking',
          frequency: 1000,
          gain: 0
        },
        {
          key: 'peaking-2000',
          type: 'peaking',
          frequency: 2000,
          gain: 0
        },
        {
          key: 'peaking-4000',
          type: 'peaking',
          frequency: 4000,
          gain: 0
        },
        {
          key: 'peaking-8000',
          type: 'peaking',
          frequency: 8000,
          gain: 0
        },
        {
          key: 'highshelf-16000',
          type: 'highshelf',
          frequency: 16000,
          gain: 0
        }
      ]
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
    },
    setIsEqualizerEnabled (
      value
    ) {
      this.isEqualizerEnabled = value
    },
    setEqualizers (
      value
    ) {
      this.equalizers = value
    }
  }
}

export default defineStore(
  'audio',
  data
)
