<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseTracksSimpleList
      :tracks="tracks"
      is-with-image
      is-with-artist-name
      is-with-album-title
      is-with-source
      is-with-duration
      is-with-playlist-option
      is-with-queue-option
      is-with-share-option
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'PlayingSegment',
  components: {
    BaseSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    playing: {
      type: Object,
      required: true
    }
  },
  computed: {
    tracks () {
      return [
        this.playing
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
