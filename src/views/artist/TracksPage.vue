<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="tracks"
    scope="tracks"
    :clientPageLimit="50"
    :responsePageLimit="50"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :artistName="slotProps.artistName"
        :topTrackCount="slotProps.topTrackCount"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryLink
        isWithListenedButton
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseTracksSimpleList
  }
}
</script>

<style lang="sass" scoped></style>
