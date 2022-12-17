import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      currentTrackId: null,
      isAutoplay: true,
      isGettingPrevious: false,
      isGettingNext: false,
      isShuffle: false,
      tracks: [],
      tracksShuffled: [],
      isClearOnPlayerClose: false
    }
  },
  getters: {
    tracksComputed (
      state
    ) {
      if (state.isShuffle) {
        return state.tracksShuffled
      } else {
        return state.tracks
      }
    },
    tracksCount (
      state
    ) {
      return state.tracks.length
    },
    currentTrackIndex (
      state
    ) {
      function isMatchedTrack (
        trackData
      ) {
        return (
          trackData.uuid ===
            state.currentTrackId
        )
      }

      return this.tracksComputed.findIndex(
        isMatchedTrack
      )
    },
    isStart () {
      return (
        this.currentTrackIndex === 0
      )
    },
    isEnd () {
      return (
        this.currentTrackIndex ===
          this.tracksCount - 1
      )
    },
    previousTrack () {
      return this.tracksComputed[
        this.currentTrackIndex - 1
      ]
    },
    nextTrack () {
      return this.tracksComputed[
        this.currentTrackIndex + 1
      ]
    }
  },
  actions: {
    setTracks (
      value
    ) {
      this.tracks = value
    },
    setTracksShuffled (
      value
    ) {
      this.tracksShuffled = value
    },
    setIsShuffle (
      value
    ) {
      this.isShuffle = value
    },
    setCurrentTrackId (
      value
    ) {
      this.currentTrackId = value
    },
    setIsGettingPrevious (
      value
    ) {
      this.isGettingPrevious = value
    },
    setIsGettingNext (
      value
    ) {
      this.isGettingNext = value
    },
    setIsAutoplay (
      value
    ) {
      this.isAutoplay = value
    },
    setIsClearOnPlayerClose (
      value
    ) {
      this.isClearOnPlayerClose = value
    }
  }
}

export default defineStore(
  'queue',
  data
)
