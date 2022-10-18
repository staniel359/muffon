<template>
  <BaseVideoChannelPaginatedSegmentContainer
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
    :client-page-limit="clientPageLimit"
    is-pagination-simple
  >
    <template #default="slotProps">
      <BaseVideoPlaylistsSimpleList
        :playlists="slotProps[scope]"
      />
    </template>
  </BaseVideoChannelPaginatedSegmentContainer>
</template>

<script>
import BaseVideoChannelPaginatedSegmentContainer
  from '@/components/containers/segments/videoChannel/BaseVideoChannelPaginatedSegmentContainer.vue'
import BaseVideoPlaylistsSimpleList
  from '@/components/lists/videoPlaylists/BaseVideoPlaylistsSimpleList.vue'
import {
  playlists as formatVideoChannelPlaylistsLink
} from '@/helpers/formatters/links/videoChannel'

export default {
  name: 'PlaylistsSegment',
  components: {
    BaseVideoChannelPaginatedSegmentContainer,
    BaseVideoPlaylistsSimpleList
  },
  props: {
    channelId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 10,
      clientPageLimit: 5,
      scope: 'playlists'
    }
  },
  computed: {
    headerLink () {
      return formatVideoChannelPlaylistsLink(
        {
          channelId: this.channelId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
