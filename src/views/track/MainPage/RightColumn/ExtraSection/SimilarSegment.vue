<template>
  <BaseTrackPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :artist-name="artistName"
    :track-title="trackTitle"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-duration
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-share-option
      />
    </template>
  </BaseTrackPaginatedSegmentContainer>
</template>

<script>
import BaseTrackPaginatedSegmentContainer
  from '*/components/containers/segments/track/BaseTrackPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  similar as formatTrackSimilarLink
} from '*/helpers/formatters/links/track'

export default {
  name: 'SimilarSegment',
  components: {
    BaseTrackPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 5,
      scope: 'similar'
    }
  },
  computed: {
    headerLink () {
      return formatTrackSimilarLink(
        {
          artistName: this.artistName,
          trackTitle: this.trackTitle
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
