<template>
  <div
    class="main-video"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div
      ref="video"
      class="ui embed"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import videoStore from '@/stores/video'
import {
  setVideo
} from '@/helpers/actions/plugins/semantic'
import {
  mainVideoOptions
} from '@/helpers/formatters/plugins/semantic'

export default {
  name: 'BaseVideo',
  props: {
    videoData: {
      type: Object,
      required: true
    },
    isWithAutoplay: Boolean
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      videoStore,
      {
        isVideoAutoplay: 'isAutoplay'
      }
    ),
    videoOptions () {
      return mainVideoOptions(
        {
          videoId: this.videoId,
          isAutoplay: this.isAutoplay
        }
      )
    },
    videoId () {
      return this.videoData.source.id
    },
    isAutoplay () {
      return (
        this.isWithAutoplay &&
          this.isVideoAutoplay
      )
    }
  },
  watch: {
    isAutoplay: 'handleIsAutoplayChange'
  },
  mounted () {
    this.initialize()
  },
  methods: {
    handleIsAutoplayChange () {
      this.initialize()
    },
    initialize () {
      setVideo(
        this.$refs.video,
        this.videoOptions
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
