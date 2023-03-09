<template>
  <BaseTrackPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :artist-name="artistName"
    :track-title="trackTitle"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-artist-image
        is-with-duration
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
      />
    </template>
  </BaseTrackPaginatedSegmentContainer>
</template>

<script>
import BaseTrackPaginatedSegmentContainer
  from '@/components/containers/segments/track/BaseTrackPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  similar as formatTrackSimilarLink
} from '@/helpers/formatters/links/track'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'SimilarSegment',
  components: {
    BaseTrackPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      limit:
        tracksLimits.simple.extrasmall,
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
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
