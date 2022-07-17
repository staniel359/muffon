<template>
  <BaseBookmarksPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :is-with-self-icons="false"
        is-with-share-option
        is-with-delete-option
        is-bookmark
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
      limit: 5,
      scope: 'artists'
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
