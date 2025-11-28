<template>
  <BaseVideoChannelTabContainer
    :channel-id="channelId"
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
        is-with-bookmark-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseVideoChannelTabContainer>
</template>

<script>
import BaseVideoChannelTabContainer
  from '@/components/containers/tabs/videoChannel/BaseVideoChannelTabContainer.vue'
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'
import {
  videoPlaylists as videoPlaylistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PlaylistsTab',
  components: {
    BaseVideoChannelTabContainer,
    BaseVideoPlaylistsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    channelId: String
  },
  data () {
    return {
      limit:
        videoPlaylistsLimits.simple.small,
      scope: 'playlists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
