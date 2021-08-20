<template>
  <BaseProfileLibraryPaginatedPageContainer
    scope="albums"
    pageNameKey="albums"
    :profileId="profileId"
    :clientPageLimit="20"
    :responsePageLimit="20"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps.albums"
        :profileId="profileId"
        :itemsInRow="4"
        isWithArtistName
        isWithTracksCount
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '@/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
