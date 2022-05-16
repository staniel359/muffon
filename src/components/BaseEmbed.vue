<template>
  <div
    ref="video"
    class="ui embed"
    @click="handleClick"
  />
</template>

<script>
import {
  setEmbed
} from '*/helpers/actions/plugins/semantic'
import {
  mainEmbedOptions
} from '*/helpers/data/plugins/semantic'

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
      return mainEmbedOptions(
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
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
