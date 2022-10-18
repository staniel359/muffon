<template>
  <BasePageContainer
    :response-data="playlistData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :playlist-data="playlistData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatVideoPlaylistPageNavigation
  from '@/helpers/formatters/navigation/videoPlaylist'
import formatVideoPlaylistPageTab
  from '@/helpers/formatters/tabs/videoPlaylist'
import getVideoPlaylist from '@/helpers/actions/api/videoPlaylist/get'

export default {
  name: 'BaseVideoPlaylistPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    playlistId: {
      type: String,
      required: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      playlistData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatVideoPlaylistPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        playlistId: this.playlistId,
        playlistTitle: this.playlistTitle,
        channelId: this.channelId,
        channelTitle: this.channelTitle,
        scope: this.scope
      }
    },
    playlistTitle () {
      return this.playlistData?.title
    },
    channelId () {
      return this.channelData?.source?.id
    },
    channelData () {
      return this.playlistData?.channel
    },
    channelTitle () {
      return this.channelData?.title
    },
    tabData () {
      return formatVideoPlaylistPageTab(
        this.navigationData
      )
    },
    videoPlaylistArgs () {
      return {
        playlistId: this.playlistId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  watch: {
    playlistData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getVideoPlaylist,
    getData (
      {
        page
      } = {}
    ) {
      if (page) {
        this.playlistData.videos = []
      }

      this.getVideoPlaylist(
        {
          ...this.videoPlaylistArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
