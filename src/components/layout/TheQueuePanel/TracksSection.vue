<template>
  <BaseSegmentContainer class="queue-tracks-container">
    <BaseTracksSimpleList
      class="queue-tracks"
      :tracks="queueTracksFormatted"
      :isQueueable="false"
      isWithImage
      isWithIndex
      isWithArtistName
      isWithAlbumTitle
      isWithLength
      isWithSource
    />
  </BaseSegmentContainer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import {
  resetIsShuffle as resetIsQueueShuffle,
  setTracksShuffled as setQueueTracksShuffled,
  resetTracksShuffled as resetQueueTracksShuffled
} from '#/actions/queue'

export default {
  name: 'TracksSection',
  components: {
    BaseSegmentContainer,
    BaseTracksSimpleList
  },
  computed: {
    ...mapState('queue', {
      queueTracks: 'tracks',
      isQueueShuffle: 'isShuffle'
    }),
    ...mapGetters('queue', {
      queueTracksFormatted: 'tracksFormatted'
    })
  },
  watch: {
    queueTracks: 'handleQueueTracksChange',
    isQueueShuffle: 'handleIsQueueShuffleChange'
  },
  methods: {
    handleQueueTracksChange () {
      resetIsQueueShuffle()
    },
    handleIsQueueShuffleChange (value) {
      if (value) {
        setQueueTracksShuffled()
      } else {
        resetQueueTracksShuffled()
      }
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
