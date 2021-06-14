<template>
  <div
    class="ui embed video-data"
    ref="video"
  ></div>
</template>

<script>
import { setEmbed } from '#/actions/plugins/semantic'
import { mainEmbedOptions } from '#/data/plugins/semantic'

export default {
  name: 'VideoData',
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    embedOptions () {
      return mainEmbedOptions({
        videoId: this.videoId,
        placeholder: this.placeholder
      })
    },
    videoId () {
      return this.videoData.youtube_id
    },
    placeholder () {
      return this.videoData.image.small
    }
  },
  mounted () {
    setEmbed(
      this.$refs.video,
      this.embedOptions
    )
  }
}
</script>

<style lang="sass" scoped>
.video-data
  margin-bottom: 10px
</style>
