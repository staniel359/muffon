<template>
  <BaseArtistPaginatedPageContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    is-with-artist-select
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :artist-name="slotProps.artistName"
        :profile-id="slotProps.profileId"
        :items-in-row="itemsInRow"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
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
      limit: 20,
      itemsInRow: 4,
      scope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
