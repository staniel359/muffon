<template>
  <BaseBookmarksPaginatedSegmentContainer
    scope="albums"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps.albums"
        isWithArtistName
        isWithDeleteOption
        isBookmark
      />
    </template>
  </BaseBookmarksPaginatedSegmentContainer>
</template>

<script>
import BaseBookmarksPaginatedSegmentContainer
  from '*/components/containers/segments/bookmarks/BaseBookmarksPaginatedSegmentContainer.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  albums as formatBookmarkAlbumsLink
} from '*/helpers/formatters/links/bookmarks'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseBookmarksPaginatedSegmentContainer,
    BaseAlbumsSimpleList
  },
  data () {
    return {
      limit: 5
    }
  },
  computed: {
    headerLink () {
      return formatBookmarkAlbumsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
