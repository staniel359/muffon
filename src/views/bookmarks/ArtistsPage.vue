<template>
  <BaseBookmarksPaginatedPageContainer
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        is-with-created
        is-bookmark
        is-with-library-option
        is-with-favorite-option
        is-with-listened-option
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksPaginatedPageContainer>
</template>

<script>
import BaseBookmarksPaginatedPageContainer
  from '@/components/containers/pages/bookmarks/BaseBookmarksPaginatedPageContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'ArtistsPage',
  components: {
    BaseBookmarksPaginatedPageContainer,
    BaseArtistsSimpleList
  },
  data () {
    return {
      limit: 50,
      scope: 'artists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
