<template>
  <BaseBookmarksPaginatedSegmentContainer
    scope="artists"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps.artists"
        isWithDeleteOption
        isBookmark
      />
    </template>
  </BaseBookmarksPaginatedSegmentContainer>
</template>

<script>
import BaseBookmarksPaginatedSegmentContainer
  from '*/components/containers/segments/bookmarks/BaseBookmarksPaginatedSegmentContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  artists as formatBookmarkArtistsLink
} from '*/helpers/formatters/links/bookmarks'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseBookmarksPaginatedSegmentContainer,
    BaseArtistsSimpleList
  },
  data () {
    return {
      limit: 5
    }
  },
  computed: {
    headerLink () {
      return formatBookmarkArtistsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
