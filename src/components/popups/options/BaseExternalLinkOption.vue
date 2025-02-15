<template>
  <BaseOption
    icon="externalLink"
    :text="externalLinkText"
    :options="options"
    :is-loading="isLoading"
    :is-error="!!error"
    :is-disabled="!!error"
    @activate="handleActivate"
  />
</template>

<script>
import axios from 'axios'
import BaseOption from './BaseOption.vue'
import getAlbum from '@/helpers/actions/api/album/get'
import getArtist from '@/helpers/actions/api/artist/get'
import getTrack from '@/helpers/actions/api/track/get'
import getVideo from '@/helpers/actions/api/video/get'
import getVideoChannel from '@/helpers/actions/api/videoChannel/get'
import getVideoPlaylist from '@/helpers/actions/api/videoPlaylist/get'
import formatRequestAlbumData from '@/helpers/formatters/request/album/data'
import formatRequestArtistData from '@/helpers/formatters/request/artist/data'
import formatRequestTrackData from '@/helpers/formatters/request/track/data'

export default {
  name: 'BaseExternalLinkOption',
  components: {
    BaseOption
  },
  props: {
    model: {
      type: String,
      required: true
    },
    modelData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sourceLinksData: null,
      error: null,
      isLoading: false,
      scope: 'links',
      linkResolverUrl:
        'https://api.song.link/v1-alpha.1/links'
    }
  },
  computed: {
    sourceData () {
      return this.modelData.source
    },
    options () {
      return [
        {
          text: this.$t(
            'actions.externalLink.original'
          ),
          isDisabled: !this.originalLink,
          onClick:
            this.handleOriginalOptionClick
        },
        {
          text: this.$t(
            'actions.externalLink.streaming'
          ),
          isDisabled: !this.streamingLink,
          onClick:
            this.handleStreamingOptionClick
        }
      ]
    },
    originalLink () {
      return this.sourceLinksData?.original
    },
    streamingLink () {
      return this.sourceLinksData?.streaming
    },
    externalLinkText () {
      return this.$t(
        'actions.externalLink.open'
      )
    },
    albumArgs () {
      return formatRequestAlbumData(
        {
          albumData: this.modelData,
          scope: this.scope
        }
      )
    },
    artistArgs () {
      return formatRequestArtistData(
        {
          artistData: this.modelData,
          scope: this.scope
        }
      )
    },
    trackArgs () {
      return formatRequestTrackData(
        {
          trackData: this.modelData,
          scope: this.scope
        }
      )
    },
    videoArgs () {
      return {
        videoId: this.modelId,
        scope: this.scope
      }
    },
    modelId () {
      return this.sourceData.id
    },
    videoChannelArgs () {
      return {
        channelId: this.modelId,
        scope: this.scope
      }
    },
    videoPlaylistArgs () {
      return {
        playlistId: this.modelId,
        scope: this.scope
      }
    },
    isProcessBandcampLink () {
      return (
        this.isBandcampLink &&
          this.isTrack
      )
    },
    isBandcampLink () {
      return this.originalLink
        .includes(
          'bandcamp.com'
        )
    },
    isTrack () {
      return (
        this.model === 'track'
      )
    }
  },
  mounted () {
    this.sourceLinksData =
      this.sourceData?.links
  },
  methods: {
    getAlbum,
    getArtist,
    getTrack,
    getVideo,
    getVideoChannel,
    getVideoPlaylist,
    handleActivate () {
      if (!this.sourceLinksData) {
        this.getLinks()
          ?.then(
            this.handleGetLinksSuccess
          )
      }
    },
    handleGetLinksSuccess (
      {
        links
      }
    ) {
      this.sourceLinksData = links
    },
    handleOriginalOptionClick () {
      this.openExternalLink(
        this.originalLink
      )
    },
    handleStreamingOptionClick () {
      if (this.isProcessBandcampLink) {
        this.processBandcampLink()
      } else {
        this.openStreamingLink()
      }
    },
    getLinks () {
      switch (this.model) {
        case 'album':
          return this.getAlbum(
            this.albumArgs
          )
        case 'artist':
          return this.getArtist(
            this.artistArgs
          )
        case 'track':
          return this.getTrack(
            this.trackArgs
          )
        case 'video':
          return this.getVideo(
            this.videoArgs
          )
        case 'videoChannel':
          return this.getVideoChannel(
            this.videoChannelArgs
          )
        case 'videoPlaylist':
          return this.getVideoPlaylist(
            this.videoPlaylistArgs
          )
      }
    },
    processBandcampLink () {
      const params = {
        url: this.originalLink
      }

      axios.get(
        this.linkResolverUrl,
        {
          params
        }
      ).then(
        this.openStreamingLink
      )
    },
    openStreamingLink () {
      this.openExternalLink(
        this.streamingLink
      )
    },
    openExternalLink (
      value
    ) {
      window
        .mainProcess
        .openExternalLink(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
