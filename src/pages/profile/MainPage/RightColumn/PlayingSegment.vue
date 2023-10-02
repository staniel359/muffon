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
      is-with-source-option
      is-with-playlist-option
      is-with-queue-option
      is-with-save-option
      is-with-share-option
      is-with-external-link-option
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

<style lang="sass" scoped>
.main-segment-container
  padding: 1rem !important
</style>
