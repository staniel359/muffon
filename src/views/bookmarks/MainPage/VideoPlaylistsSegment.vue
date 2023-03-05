<template>
  <BaseBookmarksPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseVideoPlaylistsSimpleList
        :playlists="slotProps[scope]"
        is-with-channel-title
        is-with-created
        is-bookmark
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksPaginatedSegmentContainer>
</template>

<script>
import BaseBookmarksPaginatedSegmentContainer
  from '@/components/containers/segments/bookmarks/BaseBookmarksPaginatedSegmentContainer.vue'
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'
import {
  videoPlaylists as formatBookmarkVideoPlaylistsLink
} from '@/helpers/formatters/links/bookmarks'

export default {
  name: 'VideoPlaylistsSegment',
  components: {
    BaseBookmarksPaginatedSegmentContainer,
    BaseVideoPlaylistsSimpleList
  },
  data () {
    return {
      limit: 5,
      scope: 'videoPlaylists'
    }
  },
  computed: {
    headerLink () {
      return formatBookmarkVideoPlaylistsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
