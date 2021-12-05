<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="tracks"
    scope="tracks"
    :artistName="artistName"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :artistName="slotProps.artistName"
        :topTrackCount="slotProps.topTrackCount"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
        isWithPlaylistOption
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
  },
  props: {
    artistName: String
  },
  data () {
    return {
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
