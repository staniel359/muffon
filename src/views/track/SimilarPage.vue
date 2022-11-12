<template>
  <BaseTrackPaginatedPageContainer
    :scope="scope"
    :limit="limit"
    :source-params="sourceParams"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :artist-name="slotProps.artistName"
        is-with-artist-name
        is-with-artist-image
        is-with-duration
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
      />
    </template>
  </BaseTrackPaginatedPageContainer>
</template>

<script>
import BaseTrackPaginatedPageContainer
  from '@/components/containers/pages/track/BaseTrackPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'SimilarPage',
  components: {
    BaseTrackPaginatedPageContainer,
    BaseTracksSimpleList
  },
  props: {
    trackTitle: String,
    artistName: String
  },
  data () {
    return {
      limit: 50,
      scope: 'similar'
    }
  },
  computed: {
    sourceParams () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
