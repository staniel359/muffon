import BasePlayButton
  from '@/components/buttons/play/BasePlayButton.vue'
import getPlayerTrack from '@/helpers/actions/player/track/get'
import {
  track as formatPlayerTrack
} from '@/helpers/formatters/player/track'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  shuffleArray,
  getObjectKeysWithTrueValues
} from '@/helpers/utils'

export default {
  components: {
    BasePlayButton
  },
  provide () {
    return {
      changeCheckableOption:
        this.changeCheckableOption
    }
  },
  props: {
    limitName: {
      type: String,
      default: 'default'
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
      },
      limits: {
        default: 100,
        medium: 250
      }
    }
  },
  computed: {
    playerTrackArgs () {
      return {
        trackData: this.firstTrackData,
        isQueue: true,
        isContinuousList: true,
        queueTracks:
          this.queueTracksFormatted,
        queueTracksShuffled:
          this.queueTracksFormattedShuffled,
        isQueueShuffle: this.isQueueShuffle,
        isQueueLoop: this.isQueueLoop
      }
    },
    firstTrackData () {
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
    },
    limitComputed () {
      return this.limits[
        this.limitName
      ]
    },
    checkedOptions () {
      return getObjectKeysWithTrueValues(
        this.checkableOptions
      )
    },
    queueTracks () {
      return this.tracksData?.[
        this.scope
      ] || []
    }
  },
  methods: {
    getPlayerTrack,
    handleClick () {
      this.setupQueue()
    },
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
    setupQueue () {
      this.getTracksData().then(
        this.handleQueueTracksGet
      )
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
