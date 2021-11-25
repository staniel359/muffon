<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="albums"
    scope="albums"
    :artistName="artistName"
    :clientPageLimit="20"
    :responsePageLimit="20"
    isWithArtistSelect
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :artistName="slotProps.artistName"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    artistName: String
  }
}
</script>

<style lang="sass" scoped></style>
