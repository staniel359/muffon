<template>
  <BaseSegmentContainer
    class="queue-tracks-container"
  >
    <BaseTracksSimpleList
      class="queue-tracks"
      :tracks="queueTracksConditional"
      :is-with-self-icons="false"
      is-with-image
      is-with-artist-name
      is-with-album-title
      is-with-source
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
  updateStore
} from '*/helpers/actions'

export default {
  name: 'TracksSection',
  components: {
    BaseSegmentContainer,
    BaseTracksSimpleList
  },
  computed: {
    ...mapGetters(
      'queue',
      {
        queueTracksConditional:
        'tracksConditional'
      }
    ),
    ...mapState(
      'queue',
      {
        queueTracks: 'tracks'
      }
    )
  },
  watch: {
    queueTracks: 'handleQueueTracksChange'
  },
  methods: {
    handleQueueTracksChange (
      value
    ) {
      updateStore(
        {
          'queue.isShuffle': false
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
