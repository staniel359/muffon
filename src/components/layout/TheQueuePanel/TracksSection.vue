<template>
  <div class="queue-panel-tracks">
    <BaseTracksSimpleList
      :tracks="queueTracksFormatted"
      :isQueueable="false"
      isWithImage
      isWithIndex
      isWithArtistName
      isWithAlbumTitle
      isWithLength
      isWithSource
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import {
  resetIsShuffle as resetIsQueueShuffle,
  setTracksShuffled as setQueueTracksShuffled,
  resetTracksShuffled as resetQueueTracksShuffled
} from '#/actions/queue'

export default {
  name: 'TracksSection',
  components: {
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
.queue-panel-tracks
  @extend .overflow-y-auto
  padding: 1em
</style>
