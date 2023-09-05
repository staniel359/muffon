import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isHideLibraryTracks: null,
      isHideLibraryArtists: null,
      hideLibraryArtistsTracksCount: null,
      isHideListenedTracks: null,
      isHideListenedArtists: null
    }
  },
  actions: {
    setIsHideLibraryTracks (
      value
    ) {
      this.isHideLibraryTracks = value
    },
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
    setIsHideListenedTracks (
      value
    ) {
      this.isHideListenedTracks = value
    },
    setIsHideListenedArtists (
      value
    ) {
      this.isHideListenedArtists = value
    }
  }
}

export default defineStore(
  'recommendationTracks',
  data
)
