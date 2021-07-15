<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="albums"
    scope="albums"
    :clientPageLimit="20"
    :responsePageLimit="20"
    isWithArtistSelect
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :artistName="slotProps.artistName"
        isWithListenersCount
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
  }
}
</script>

<style lang="sass" scoped></style>
