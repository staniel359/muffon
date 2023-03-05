<template>
  <div
    v-if="isRender"
  >
    <small
      v-if="isSmall"
      v-html="videosCountText"
    />
    <span
      v-else
      v-html="videosCountText"
    />
  </div>
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
    isRender () {
      return this.videosCount >= 0
    },
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
      return `
        <strong>
          ${this.videosCountFormatted}
        </strong>
      `
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
