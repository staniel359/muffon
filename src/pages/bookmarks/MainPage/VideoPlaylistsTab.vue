<template>
  <BaseBookmarksTabContainer
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
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
  </BaseBookmarksTabContainer>
</template>

<script>
import BaseBookmarksTabContainer
  from '@/components/containers/tabs/bookmarks/BaseBookmarksTabContainer.vue'
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'
import {
  videoPlaylists as videoPlaylistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'VideoPlaylistsTab',
  components: {
    BaseBookmarksTabContainer,
    BaseVideoPlaylistsSimpleList
  },
  mixins: [
    tabMixin
  ],
  data () {
    return {
      limit:
        videoPlaylistsLimits.simple.small,
      scope: 'videoPlaylists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
