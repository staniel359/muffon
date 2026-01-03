import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      id: null,
      token: null,
      info: null,
      isRemember: null,
      language: null,
      isShowPlaying: null,
      timezone: null,
      connections: null
    }
  },
  actions: {
    setId (
      value
    ) {
      this.id = value
    },
    setToken (
      value
    ) {
      this.token = value
    },
    setInfo (
      value
    ) {
      this.info = value
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
    setConnections (
      value
    ) {
      this.connections = value
    }
  }
}

export default defineStore(
  'profile',
  data
)
