import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isHideLibraryArtists: null,
      hideLibraryArtistsTracksCount: null,
      isHideListenedArtists: null
    }
  },
  actions: {
    setIsHideLibraryArtists (
      value
    ) {
      this.isHideLibraryArtists = value
    },
    setHideLibraryArtistsTracksCount (
      value
    ) {
      this.hideLibraryArtistsTracksCount = value
    },
    setIsHideListenedArtists (
      value
    ) {
      this.isHideListenedArtists = value
    }
  }
}

export default defineStore(
  'recommendationArtists',
  data
)
