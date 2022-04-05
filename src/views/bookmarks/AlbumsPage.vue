<template>
  <BaseBookmarksPaginatedPageContainer
    scope="albums"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps.albums"
        isWithArtistName
        isWithDeleteOption
        isBookmark
      />
    </template>
  </BaseBookmarksPaginatedPageContainer>
</template>

<script>
import BaseBookmarksPaginatedPageContainer
  from '*/components/containers/pages/bookmarks/BaseBookmarksPaginatedPageContainer.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BaseBookmarksPaginatedPageContainer,
    BaseAlbumsSimpleList
  },
  data () {
    return {
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
