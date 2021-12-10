<template>
  <BaseSegmentContainer
    class="queue-tracks-container"
  >
    <BaseTracksSimpleList
      class="queue-tracks"
      :tracks="queueTracksFormatted"
      :isQueueable="false"
      :isWithSelfIcons="false"
      isWithImage
      isWithArtistName
      isWithAlbumTitle
      isWithSource
    />
  </BaseSegmentContainer>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { updateStore } from '#/actions'

export default {
  name: 'TracksSection',
  components: {
    BaseSegmentContainer,
    BaseTracksSimpleList
  },
  computed: {
    ...mapGetters('queue', {
      queueTracksFormatted: 'tracksFormatted'
    }),
    ...mapState('queue', {
      queueTracks: 'tracks'
    })
  },
  watch: {
    queueTracks: 'handleQueueTracksChange'
  },
  methods: {
    handleQueueTracksChange (value) {
      updateStore({
        'queue.isShuffle': false
      })
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
