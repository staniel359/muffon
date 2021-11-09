<template>
  <div>
    <div
      ref="video"
      class="ui embed video-embed"
      @click="handleClick"
    ></div>

    <div class="video-data-more-container">
      <BaseLinkContainer
        :link="videoMainLinkFormatted"
      >
        <strong class="link">
          {{ moreFormatted }}
        </strong>
      </BaseLinkContainer>
    </div>
  </div>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import { setEmbed } from '#/actions/plugins/semantic'
import { mainEmbedOptions } from '#/data/plugins/semantic'
import { main as formatVideoMainLink } from '#/formatters/links/video'

export default {
  name: 'VideoData',
  components: {
    BaseLinkContainer
  },
  props: {
    selectedVideoData: {
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
      return this.selectedVideoData.youtube_id
    },
    placeholder () {
      return this.selectedVideoData.image.small
    },
    videoMainLinkFormatted () {
      return formatVideoMainLink({
        videoId: this.videoId
      })
    },
    moreFormatted () {
      return this.$t(
        'shared.more'
      )
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

<style lang="sass" scoped>
.video-embed
  margin: 1em 0

.video-data-more-container
  @extend .d-flex, .justify-content-flex-end
</style>
