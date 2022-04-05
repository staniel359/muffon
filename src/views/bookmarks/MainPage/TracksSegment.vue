<template>
  <BaseBookmarksPaginatedSegmentContainer
    scope="tracks"
    :limit="limit"
    :headerLink="headerLink"
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
  </BaseBookmarksPaginatedSegmentContainer>
</template>

<script>
import BaseBookmarksPaginatedSegmentContainer
  from '*/components/containers/segments/bookmarks/BaseBookmarksPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatBookmarkTracksLink
} from '*/helpers/formatters/links/bookmarks'

export default {
  name: 'TracksSegment',
  components: {
    BaseBookmarksPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  data () {
    return {
      limit: 5
    }
  },
  computed: {
    headerLink () {
      return formatBookmarkTracksLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
