<template>
  <BaseVideoChannelPaginatedPageContainer
    ref="page"
    :key="refreshKey"
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
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
  </BaseVideoChannelPaginatedPageContainer>
</template>

<script>
import BaseVideoChannelPaginatedPageContainer
  from '@/components/containers/pages/videoChannel/BaseVideoChannelPaginatedPageContainer.vue'
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'
import {
  videoPlaylists as videoPlaylistsLimits
} from '@/helpers/data/limits'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseVideoChannelPaginatedPageContainer,
    BaseVideoPlaylistsSimpleList
  },
  mixins: [
    pageMixin
  ],
  props: {
    channelId: String
  },
  data () {
    return {
      limit:
        videoPlaylistsLimits.simple.large,
      scope: 'playlists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
