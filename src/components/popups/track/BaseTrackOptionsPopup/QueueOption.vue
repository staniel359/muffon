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
  generateKey
} from '@/helpers/utils'
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
    trackData: {
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
    queueText () {
      return this.$t(
        'actions.addTo.queue'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.added.queue.track',
        {
          trackFullTitle: this.trackFullTitleStrong
        }
      )
    },
    trackFullTitleStrong () {
      return `
        <strong>
          ${this.trackFullTitle}
        </strong>
      `
    },
    trackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  },
  methods: {
    handleClick () {
      this.addToQueue()

      this.notifySuccess()
    },
    addToQueue () {
      const trackDataFormatted = {
        ...this.trackData,
        uuid: generateKey()
      }

      const tracks = [
        ...this.queueTracks,
        trackDataFormatted
      ]

      const tracksShuffled = [
        ...this.queueTracksShuffled,
        trackDataFormatted
      ]

      updateGlobalStore(
        {
          'queue.tracks': tracks,
          'queue.tracksShuffled': tracksShuffled
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
