<template>
  <BaseBookmarksPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :is-with-self-icons="false"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-source
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
        is-with-delete-option
        is-bookmark
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
