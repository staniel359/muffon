<template>
  <BaseProfileLibraryPaginatedPageContainer
    scope="tracks"
    pageNameKey="tracks"
    :profileId="profileId"
    :clientPageLimit="50"
    :responsePageLimit="50"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        isWithImage
        isWithArtistName
        isWithAlbumTitle
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '@/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
