<template>
  <div class="ui segment video-data">
    <div
      class="ui embed"
      ref="video"
    ></div>
  </div>
</template>

<script>
import { mainEmbedOptions } from '#/data/plugins/semantic'
import { setEmbed } from '#/actions/plugins/semantic'

export default {
  name: 'VideoData',
  props: {
    selectedVideoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    embedOptions () {
      return mainEmbedOptions({
        id: this.videoId,
        placeholder: this.placeholder
      })
    },
    videoId () {
      return this.selectedVideoData.youtube_id
    },
    placeholder () {
      return this.selectedVideoData.image.medium
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
  margin-top: 20px
</style>
