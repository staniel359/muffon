<template>
  <BaseBookmarksPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
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
      limit: 10,
      scope: 'tracks'
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
