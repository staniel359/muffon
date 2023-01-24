import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isHideLibraryArtists: false,
      isHideListenedArtists: false,
      tracksCount: 0
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
