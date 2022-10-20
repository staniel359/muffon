<template>
  <BaseVideoChannelPaginatedPageContainer
    ref="page"
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseVideoPlaylistsSimpleList
        :playlists="slotProps[scope]"
        is-with-share-option
      />
    </template>
  </BaseVideoChannelPaginatedPageContainer>
</template>

<script>
import BaseVideoChannelPaginatedPageContainer
  from '@/components/containers/pages/videoChannel/BaseVideoChannelPaginatedPageContainer.vue'
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseVideoChannelPaginatedPageContainer,
    BaseVideoPlaylistsSimpleList
  },
  props: {
    channelId: String
  },
  data () {
    return {
      limit: 50,
      scope: 'playlists'
    }
  }
}
</script>

<style lang="sass" scoped></style>
