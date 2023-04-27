import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      info: null,
      token: null,
      isRemember: null,
      language: null,
      isShowPlaying: null,
      timezone: null,
      isAnonymous: null
    }
  },
  getters: {
    id (
      state
    ) {
      return state.info?.id?.toString()
    }
  },
  actions: {
    setInfo (
      value
    ) {
      this.info = value
    },
    setToken (
      value
    ) {
      this.token = value
    },
    setIsRemember (
      value
    ) {
      this.isRemember = value
    },
    setLanguage (
      value
    ) {
      this.language = value
    },
    setIsShowPlaying (
      value
    ) {
      this.isShowPlaying = value
    },
    setTimezone (
      value
    ) {
      this.timezone = value
    },
    setIsAnonymous (
      value
    ) {
      this.isAnonymous = value
    }
  }
}

export default defineStore(
  'profile',
  data
)
