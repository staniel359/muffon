<template>
  <BaseBookmarksPaginatedPageContainer
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        is-with-artist-name
        is-with-delete-option
        is-bookmark
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
      limit: 50,
      scope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
