<template>
  <BaseBookmarksPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        is-with-artist-name
        is-with-source
        is-with-created
        is-bookmark
        is-with-library-option
        is-with-favorite-option
        is-with-listened-option
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksPaginatedSegmentContainer>
</template>

<script>
import BaseBookmarksPaginatedSegmentContainer
  from '@/components/containers/segments/bookmarks/BaseBookmarksPaginatedSegmentContainer.vue'
import BaseAlbumsSimpleList
  from '@/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  albums as formatBookmarkAlbumsLink
} from '@/helpers/formatters/links/bookmarks'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseBookmarksPaginatedSegmentContainer,
    BaseAlbumsSimpleList
  },
  data () {
    return {
      limit: 5,
      scope: 'albums'
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
