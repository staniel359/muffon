<template>
  <BaseSegmentContainer class="video-data">
    <div
      class="ui embed"
      ref="video"
    ></div>
  </BaseSegmentContainer>

  <div class="video-data-more-container">
    <BaseLinkContainer
      :link="videoMainLinkFormatted"
    >
      <strong class="link">
        {{ moreFormatted }}
      </strong>
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import { setEmbed } from '#/actions/plugins/semantic'
import { mainEmbedOptions } from '#/data/plugins/semantic'
import { videoMain as formatVideoMainLink } from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'VideoData',
  components: {
    BaseSegmentContainer,
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
.video-data
  margin: 20px 0

.video-data-more-container
  @extend .d-flex, .justify-content-flex-end
</style>
