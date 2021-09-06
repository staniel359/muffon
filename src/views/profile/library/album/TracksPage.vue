<template>
  <BaseProfileLibraryAlbumPaginatedPageContainer
    pageNameKey="tracks"
    scope="tracks"
    :clientPageLimit="50"
    :responsePageLimit="50"
    :profileId="profileId"
    :albumId="albumId"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :artistName="slotProps.artistName"
        :artistId="slotProps.artistId"
        isWithImage
        isWithCreated
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryAlbumPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPaginatedPageContainer
  from '@/containers/pages/profile/library/album/BaseProfileLibraryAlbumPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BaseProfileLibraryAlbumPaginatedPageContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String,
    albumId: String
  }
}
</script>

<style lang="sass" scoped></style>
