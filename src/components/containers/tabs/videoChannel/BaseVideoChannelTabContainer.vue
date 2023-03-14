<template>
  <BasePaginatedTabContainer
    :response-data="channelData"
    :scope="scope"
    :limit="limit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    :is-pagination-simple="isPaginationSimple"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #default="slotProps"
    >
      <slot
        :[scope]="slotProps[scope]"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getVideoChannel from '@/helpers/actions/api/videoChannel/get'
import {
  videos as formatVideoChannelVideosLink,
  playlists as formatVideoChannelPlaylistsLink
} from '@/helpers/formatters/links/videoChannel'

export default {
  name: 'BaseVideoChannelTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    channelId: {
      type: String,
      required: true
    },
    isPaginationSimple: Boolean
  },
  data () {
    return {
      channelData: null
    }
  },
  computed: {
    videoChannelArgs () {
      return {
        channelId: this.channelId,
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'videos':
          return formatVideoChannelVideosLink(
            {
              channelId: this.channelId
            }
          )
        case 'playlists':
          return formatVideoChannelPlaylistsLink(
            {
              channelId: this.channelId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getVideoChannel,
    getData (
      {
        page
      } = {}
    ) {
      this.getVideoChannel(
        {
          ...this.videoChannelArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
