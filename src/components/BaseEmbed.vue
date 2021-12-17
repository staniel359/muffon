<template>
  <div
    class="ui embed"
    ref="video"
    @click="handleClick"
  ></div>
</template>

<script>
import { setEmbed } from '#/actions/plugins/semantic'
import { mainEmbedOptions } from '#/data/plugins/semantic'

export default {
  name: 'BaseEmbed',
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'click'
  ],
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
      return this.imageData.small
    },
    imageData () {
      return this.videoData.image
    }
  },
  mounted () {
    setEmbed(
      this.$refs.video,
      this.embedOptions
    )
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>
