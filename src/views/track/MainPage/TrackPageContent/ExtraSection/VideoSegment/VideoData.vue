<template>
  <div>
    <div
      class="ui embed video-embed"
      ref="video"
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
import { localize } from '#/actions/plugins/i18n'

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
      return localize('shared.more')
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
.video-embed
  margin: 1em 0

.video-data-more-container
  @extend .d-flex, .justify-content-flex-end
</style>
