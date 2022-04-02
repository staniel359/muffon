<template>
  <BaseTagPaginatedPageContainer
    scope="albums"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="slotProps.albums"
        :profileId="slotProps.profileId"
        isWithArtistName
        isWithListenersCount
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </template>
  </BaseTagPaginatedPageContainer>
</template>

<script>
import BaseTagPaginatedPageContainer
  from '*/components/containers/pages/tag/BaseTagPaginatedPageContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseAlbumsTableList
  },
  data () {
    return {
      limit: 20
    }
  }
}
</script>

<style lang="sass" scoped></style>
