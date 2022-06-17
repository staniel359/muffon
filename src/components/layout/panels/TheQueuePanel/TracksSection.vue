<template>
  <BaseSegmentContainer
    class="queue-tracks-container"
  >
    <BaseTracksSimpleList
      :key="key"
      class="queue-tracks"
      :tracks="queueTracksComputed"
      :is-with-self-icons="false"
      is-with-image
      is-with-artist-name
      is-with-album-title
      is-with-source
      is-with-playlist-option
      is-with-share-option
      is-with-clear-button
      @clear-button-click="handleClearButtonClick"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapGetters,
  mapState
} from 'vuex'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'TracksSection',
  components: {
    BaseSegmentContainer,
    BaseTracksSimpleList
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapGetters(
      'queue',
      {
        queueTracksComputed: 'tracksComputed'
      }
    ),
    ...mapState(
      'queue',
      {
        queueTracks: 'tracks',
        queueTracksShuffled: 'tracksShuffled'
      }
    )
  },
  watch: {
    queueTracksComputed:
      'handleQueueTracksComputedChange'
  },
  methods: {
    handleQueueTracksComputedChange () {
      this.key = generateKey()
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      const isMatchedTrack = (
        trackData
      ) => {
        return trackData.uuid !== uuid
      }

      const tracks = [
        ...this.queueTracks.filter(
          isMatchedTrack
        )
      ]

      const tracksShuffled = [
        ...this.queueTracksShuffled.filter(
          isMatchedTrack
        )
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

<style lang="sass" scoped>
.queue-tracks-container
  @extend .overflow-hidden, .flex-full
  padding: 1em 1em calc(#{$playerPanelHeight} + 1em) 1em

.queue-tracks
  @extend .h-100, .overflow-y-auto
</style>
