<template>
  <BaseTagPaginatedPageContainer
    pageNameKey="albums"
    scope="albums"
    :clientPageLimit="20"
    :responsePageLimit="20"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :profileId="slotProps.profileId"
        isWithArtistName
        isWithListenersCount
        isWithLibraryLink
        isWithListenedButton
        isWithBookmarkButton
        isWithFavoriteButton
      />
    </template>
  </BaseTagPaginatedPageContainer>
</template>

<script>
import BaseTagPaginatedPageContainer
  from '@/containers/pages/tag/BaseTagPaginatedPageContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseAlbumsTableList
  }
}
</script>

<style lang="sass" scoped></style>
