<template>
  <div
    class="base-video overflow-hidden border-radius border-inner"
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
  set as setVideo
} from '@/helpers/actions/plugins/semantic/video'
import {
  main as mainVideoOptions
} from '@/helpers/formatters/plugins/semantic/options/video'

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
