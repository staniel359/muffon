import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isCheckForNewVersions: null,
      isAutoupdateAvailable: null,
      isAutoupdateBeta: null,
      isAutoupdateEnabled: null
    }
  },
  actions: {
    setIsCheckForNewVersions (
      value
    ) {
      this.isCheckForNewVersions = value
    },
    setIsAutoupdateAvailable (
      value
    ) {
      this.isAutoupdateAvailable = value
    },
    setIsAutoupdateBeta (
      value
    ) {
      this.isAutoupdateBeta = value
    },
    setIsAutoupdateEnabled (
      value
    ) {
      this.isAutoupdateEnabled = value
    }
  }
}

export default defineStore(
  'updates',
  data
)
