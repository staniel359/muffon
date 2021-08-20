<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    pageNameKey="tracks"
    scope="tracks"
    :clientPageLimit="50"
    :responsePageLimit="50"
    :profileId="profileId"
    :artistId="artistId"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :artistId="artistId"
        :artistName="slotProps.artistName"
        isWithImage
        isWithAlbumTitle
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '@/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BaseProfileLibraryArtistPaginatedPageContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String,
    artistId: String
  }
}
</script>

<style lang="sass" scoped></style>
