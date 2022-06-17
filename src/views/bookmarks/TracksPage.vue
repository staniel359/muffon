<template>
  <BaseBookmarksPaginatedPageContainer
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
        is-with-delete-option
        is-bookmark
      />
    </template>
  </BaseBookmarksPaginatedPageContainer>
</template>

<script>
import BaseBookmarksPaginatedPageContainer
  from '*/components/containers/pages/bookmarks/BaseBookmarksPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BaseBookmarksPaginatedPageContainer,
    BaseTracksSimpleList
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
