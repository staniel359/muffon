<template>
  <BaseArtistPaginatedPageContainer
    :artistName="artistName"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :artistName="slotProps.artistName"
        :profileId="slotProps.profileId"
        :topTrackCount="slotProps.topTrackCount"
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
  from '*/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

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
      limit: 50,
      scope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>
