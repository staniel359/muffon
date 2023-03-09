<template>
  <BaseVideoChannelPaginatedSegmentContainer
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
    is-pagination-simple
  >
    <template
      #default="slotProps"
    >
      <BaseVideoPlaylistsSimpleList
        :playlists="slotProps[scope]"
        is-with-bookmark-option
        is-with-share-option
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
import {
  videoPlaylists as videoPlaylistsLimits
} from '@/helpers/data/limits'

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
      limit:
        videoPlaylistsLimits.simple.extrasmall,
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
