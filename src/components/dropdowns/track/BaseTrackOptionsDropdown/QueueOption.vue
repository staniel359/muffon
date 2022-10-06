<template>
  <div
    class="item"
    @click="handleClick"
  >
    <BaseIcon
      icon="list ul"
    />

    {{ queueText }}
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
import {
  setToast
} from '@/helpers/actions/plugins/semantic'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'QueueOption',
  components: {
    BaseIcon
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(
      'queue',
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
    addedMessage () {
      return this.$t(
        'notifications.added.queue.track',
        {
          trackFullTitle: this.trackFullTitleStrong
        }
      )
    },
    trackFullTitleStrong () {
      return `<strong>${this.trackFullTitle}</strong>`
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

      this.notify()
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
    },
    notify () {
      setToast(
        {
          message: this.addedMessage,
          icon: 'green check'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
