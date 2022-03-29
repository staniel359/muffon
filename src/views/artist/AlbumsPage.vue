<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="albums"
    scope="albums"
    :artistName="artistName"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    isWithArtistSelect
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :artistName="slotProps.artistName"
        :profileId="slotProps.profileId"
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '*/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    artistName: String
  },
  data () {
    return {
      limit: 20
    }
  }
}
</script>

<style lang="sass" scoped></style>
