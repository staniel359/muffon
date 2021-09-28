<template>
  <BaseTopPaginatedSegmentContainer
    scope="artists"
    :clientPageLimit="5"
    :responsePageLimit="5"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="5"
        :artists="slotProps.artists"
        isWithListenersCount
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
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseArtistsTableList
  }
}
</script>

<style lang="sass" scoped></style>
