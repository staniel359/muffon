import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      currentTrackId: null,
      isAutoplay: null,
      isGettingPrevious: false,
      isGettingNext: false,
      isShuffle: null,
      tracks: null,
      tracksShuffled: null,
      isClearOnPlayerClose: null,
      isLoop: null
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

      return this.tracksComputed
        .findIndex(
          isMatchedTrack
        )
    },
    isStart () {
      return (
        !this.isQueueTrack || (
          this.currentTrackIndex ===
            this.firstTrackIndex
        )
      )
    },
    isQueueTrack () {
      return (
        this.currentTrackIndex >= 0
      )
    },
    firstTrackIndex () {
      return 0
    },
    isEnd () {
      return (
        !this.isQueueTrack || (
          this.currentTrackIndex ===
            this.lastTrackIndex
        )
      )
    },
    lastTrackIndex () {
      return (
        this.tracksCount - 1
      )
    },
    previousTrack () {
      return this.tracksComputed[
        this.previousTrackIndex
      ]
    },
    previousTrackIndex () {
      if (this.isStart) {
        return this.lastTrackIndex
      } else {
        return (
          this.currentTrackIndex - 1
        )
      }
    },
    nextTrack () {
      return this.tracksComputed[
        this.nextTrackIndex
      ]
    },
    nextTrackIndex () {
      if (this.isEnd) {
        return this.firstTrackIndex
      } else {
        return (
          this.currentTrackIndex + 1
        )
      }
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
    },
    setIsLoop (
      value
    ) {
      this.isLoop = value
    }
  }
}

export default defineStore(
  'queue',
  data
)
