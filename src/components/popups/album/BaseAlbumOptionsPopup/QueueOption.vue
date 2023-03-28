<template>
  <BaseOption
    icon="queue"
    :text="queueText"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseOption from '@/components/popups/options/BaseOption.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  collection as formatCollection,
  number as formatNumber
} from '@/helpers/formatters'
import {
  track as formatPlayerTrack
} from '@/helpers/formatters/player/track'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'QueueOption',
  components: {
    BaseOption
  },
  mixins: [
    notificationMixin
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(
      queueStore,
      {
        queueTracks: 'tracks',
        queueTracksShuffled: 'tracksShuffled'
      }
    ),
    tracksCollection () {
      return formatCollection(
        this.tracksFormatted
      )
    },
    tracksFormatted () {
      return this.tracks.map(
        this.formatTrack
      )
    },
    tracks () {
      return this.albumData.tracks || []
    },
    imageData () {
      return this.albumData.image
    },
    queueText () {
      return this.$t(
        'actions.addTo.queue'
      )
    },
    notificationSuccessMessage () {
      return this.$tc(
        'notifications.added.queue.tracks',
        this.tracksCount,
        {
          counter: this.counterText
        }
      )
    },
    tracksCount () {
      return this.tracks.length
    },
    counterText () {
      return this.$tc(
        'counters.nominative.tracks',
        this.tracksCount,
        {
          count: this.tracksCountStrong
        }
      )
    },
    tracksCountStrong () {
      return `
        <strong>
          ${this.tracksCountFormatted}
        </strong/>
      `
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    }
  },
  methods: {
    handleClick () {
      this.addTracksToQueue()

      this.notifySuccess()
    },
    addTracksToQueue () {
      const tracks = [
        ...this.queueTracks,
        ...this.tracksCollection
      ]

      const tracksShuffled = [
        ...this.queueTracksShuffled,
        ...this.tracksCollection
      ]

      updateGlobalStore(
        {
          'queue.tracks': tracks,
          'queue.tracksShuffled': tracksShuffled
        }
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
          albumData: this.albumData && {
            source: this.albumData.source,
            title: this.albumData.title
          },
          imageData: this.imageData,
          isFromSource
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
