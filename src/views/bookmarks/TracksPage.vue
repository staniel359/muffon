<template>
  <BaseBookmarksPaginatedPageContainer
    scope="tracks"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        isWithImage
        isWithArtistName
        isWithAlbumTitle
        isWithPlaylistOption
        isWithDeleteOption
        isBookmark
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
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
