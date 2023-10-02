<template>
  <BaseHeaderSegmentsContainer
    scope="listeningNow"
  >
    <BaseSegmentContainer
      class="not-top-padded"
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
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'PlayingSegment',
  components: {
    BaseHeaderSegmentsContainer,
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
