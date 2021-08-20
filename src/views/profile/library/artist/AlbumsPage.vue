<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    pageNameKey="albums"
    scope="albums"
    :clientPageLimit="20"
    :responsePageLimit="20"
    :profileId="profileId"
    :artistId="artistId"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :profileId="profileId"
        isWithTracksCount
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '@/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryArtistPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: String,
    artistId: String
  }
}
</script>

<style lang="sass" scoped></style>
