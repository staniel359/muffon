<template>
  <BaseTrackPaginatedSegmentContainer
    scope="similar"
    :limit="limit"
    :artistName="artistName"
    :trackTitle="trackTitle"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.similar"
        :profileId="slotProps.profileId"
        isWithArtistName
        isWithDuration
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
        isWithPlaylistOption
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
      limit: 5
    }
  },
  computed: {
    headerLink () {
      return formatTrackSimilarLink({
        artistName: this.artistName,
        trackTitle: this.trackTitle
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
