<template>
  <BaseTopPaginatedSegmentContainer
    scope="tracks"
    :clientPageLimit="10"
    :responsePageLimit="10"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        isWithArtistName
        isWithLibraryLink
        isWithFavoriteButton
        isWithBookmarkButton
        isWithListenedButton
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '@/containers/pages/top/BaseTopPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseTracksSimpleList
  }
}
</script>

<style lang="sass" scoped></style>
