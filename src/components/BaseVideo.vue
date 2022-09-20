<template>
  <div
    ref="video"
    class="ui embed main-video"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  setVideo,
  resetVideo
} from '@/helpers/actions/plugins/semantic'
import {
  mainVideoOptions
} from '@/helpers/data/plugins/semantic'

export default {
  name: 'BaseVideo',
  props: {
    videoData: {
      type: Object,
      required: true
    },
    isWithAutoplay: Boolean
  },
  emits: [
    'click'
  ],
  data () {
    return {
      isPlaying: false
    }
  },
  computed: {
    ...mapState(
      'video',
      {
        isVideoAutoplay: 'isAutoplay'
      }
    ),
    videoOptions () {
      return mainVideoOptions(
        {
          videoId: this.videoId,
          placeholder: this.placeholder
        }
      )
    },
    videoId () {
      return this.videoData.source.id
    },
    placeholder () {
      return this.imageData.small
    },
    imageData () {
      return this.videoData.image
    },
    isPlayVideo () {
      return (
        this.isWithAutoplay &&
          this.isVideoAutoplay
      )
    }
  },
  watch: {
    isVideoAutoplay: 'handleIsVideoAutoplayChange'
  },
  mounted () {
    setVideo(
      this.$refs.video,
      this.videoOptions
    )

    if (this.isPlayVideo) {
      this.playVideo()
    }
  },
  methods: {
    handleIsVideoAutoplayChange (
      value
    ) {
      if (
        this.isWithAutoplay &&
          !this.isPlaying
      ) {
        resetVideo(
          this.$refs.video
        )

        if (value) {
          this.playVideo()
        }
      }
    },
    handleClick () {
      this.isPlaying = true

      this.$emit(
        'click'
      )
    },
    playVideo () {
      this.$refs
        .video
        .firstChild
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
