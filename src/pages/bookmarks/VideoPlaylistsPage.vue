<template>
  <BaseBookmarksPaginatedPageContainer
    :key="refreshKey"
    model="bookmarkVideoPlaylist"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
    is-with-reload-button
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
        is-with-external-link-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksPaginatedPageContainer>
</template>

<script>
import BaseBookmarksPaginatedPageContainer
  from '@/components/containers/pages/bookmarks/BaseBookmarksPaginatedPageContainer.vue'
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  videoPlaylists as videoPlaylistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'VideoPlaylistsPage',
  components: {
    BaseBookmarksPaginatedPageContainer,
    BaseVideoPlaylistsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  data () {
    return {
      limit:
        videoPlaylistsLimits.simple.large,
      scope: 'videoPlaylists',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
