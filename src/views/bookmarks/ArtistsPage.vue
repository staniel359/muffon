<template>
  <BaseBookmarksPaginatedPageContainer
    scope="artists"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps.artists"
        isWithDeleteOption
        isBookmark
      />
    </template>
  </BaseBookmarksPaginatedPageContainer>
</template>

<script>
import BaseBookmarksPaginatedPageContainer
  from '*/components/containers/pages/bookmarks/BaseBookmarksPaginatedPageContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'ArtistsPage',
  components: {
    BaseBookmarksPaginatedPageContainer,
    BaseArtistsSimpleList
  },
  data () {
    return {
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
