<template>
  <div
    v-if="isSmall"
  >
    <small
      v-html="videosCountText"
    />
  </div>
  <div
    v-else
    v-html="videosCountText"
  />
</template>

<script>
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseVideoPlaylistVideosCountSection',
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    isSmall: Boolean
  },
  computed: {
    videosCountText () {
      return this.$tc(
        'counters.nominative.videos',
        this.videosCount,
        {
          count: this.videosCountStrong
        }
      )
    },
    videosCount () {
      return this.playlistData.videos_count
    },
    videosCountStrong () {
      return `<strong>${this.videosCountFormatted}</strong>`
    },
    videosCountFormatted () {
      return formatNumber(
        this.videosCount
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
