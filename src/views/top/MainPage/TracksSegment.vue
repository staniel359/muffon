<template>
  <BaseTopPaginatedSegmentContainer
    scope="tracks"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        isWithArtistName
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
        isWithPlaylistOption
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '*/components/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatTopTracksLink
} from '*/helpers/formatters/links/top'

export default {
  name: 'TracksSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  data () {
    return {
      limit: 10
    }
  },
  computed: {
    headerLink () {
      return formatTopTracksLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
