import getPlayerTrack from '@/helpers/actions/player/track/get'
import {
  track as formatPlayerTrack
} from '@/helpers/formatters/player/track'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  shuffleArray
} from '@/helpers/utils'

export default {
  provide () {
    return {
      changeCheckableOption:
        this.changeCheckableOption
    }
  },
  data () {
    return {
      error: null,
      isLoading: false,
      scope: 'tracks',
      checkableOptions: {
        shuffle: false,
        loop: false
      }
    }
  },
  computed: {
    playerTrackArgs () {
      return {
        trackData: this.trackData,
        isQueue: true,
        isPlayableList: true,
        queueTracks:
          this.queueTracksFormatted,
        queueTracksShuffled:
          this.queueTracksFormattedShuffled,
        isQueueShuffle: this.isQueueShuffle,
        isQueueLoop: this.isQueueLoop
      }
    },
    trackData () {
      return this.queueTracksComputed[0]
    },
    queueTracksComputed () {
      if (this.isQueueShuffle) {
        return this.queueTracksFormattedShuffled
      } else {
        return this.queueTracksFormatted
      }
    },
    isQueueShuffle () {
      return this.checkableOptions.shuffle
    },
    queueTracksFormattedShuffled () {
      return shuffleArray(
        this.queueTracksFormatted
      )
    },
    queueTracksFormatted () {
      return formatCollection(
        this.queueTracks
      ).map(
        this.formatTrack
      )
    },
    isQueueLoop () {
      return this.checkableOptions.loop
    }
  },
  methods: {
    getPlayerTrack,
    handleQueueTracksGet () {
      this.getPlayerTrack(
        this.playerTrackArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.isLoading = false
    },
    formatTrack (
      trackData
    ) {
      const isFromSource =
        trackData.audio?.present

      return formatPlayerTrack(
        {
          trackData,
          isFromSource
        }
      )
    },
    changeCheckableOption (
      {
        key,
        value
      }
    ) {
      this.checkableOptions[key] = value
    }
  }
}
