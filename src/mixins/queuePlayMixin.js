import getPlayerTrack from '@/helpers/actions/player/track/get'
import {
  track as formatPlayerTrack
} from '@/helpers/formatters/player/track'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  data () {
    return {
      error: null,
      isLoading: false,
      scope: 'tracks'
    }
  },
  computed: {
    playerTrackArgs () {
      return {
        trackData: this.trackData,
        queueTracks:
          this.queueTracksFormatted,
        isSkipOnError: true
      }
    },
    trackData () {
      return this.queueTracksFormatted[0]
    },
    queueTracksFormatted () {
      return formatCollection(
        this.queueTracks
      ).map(
        this.formatTrack
      )
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
    }
  }
}
