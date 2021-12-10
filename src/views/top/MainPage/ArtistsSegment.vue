<template>
  <BaseTopPaginatedSegmentContainer
    scope="artists"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="5"
        :artists="slotProps.artists"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '@/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  data () {
    return {
      limit: 5
    }
  }
}
</script>

<style lang="sass" scoped></style>
