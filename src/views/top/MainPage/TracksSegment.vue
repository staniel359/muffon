<template>
  <BaseTopPaginatedSegmentContainer
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
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
  }
}
</script>

<style lang="sass" scoped></style>
