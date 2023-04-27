import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isHideLibraryArtists: null,
      isHideListenedArtists: null,
      tracksCount: null
    }
  },
  actions: {
    setIsHideLibraryArtists (
      value
    ) {
      this.isHideLibraryArtists = value
    },
    setIsHideListenedArtists (
      value
    ) {
      this.isHideListenedArtists = value
    },
    setTracksCount (
      value
    ) {
      this.tracksCount = value
    }
  }
}

export default defineStore(
  'recommendations',
  data
)
