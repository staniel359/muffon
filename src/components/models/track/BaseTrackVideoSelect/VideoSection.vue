<template>
  <div>
    <BaseVideo
      class="video-section"
      :video-data="videoData"
      is-with-autoplay
    />

    <div class="video-more-container">
      <BaseLinkContainer
        :link="videoMainLink"
      >
        <strong
          class="link"
          v-text="moreText"
        />
      </BaseLinkContainer>
    </div>
  </div>
</template>

<script>
import BaseVideo from '@/components/BaseVideo.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import {
  main as formatVideoMainLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'VideoSection',
  components: {
    BaseVideo,
    BaseLinkContainer
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    videoId () {
      return this.videoData.source.id
    },
    videoMainLink () {
      return formatVideoMainLink(
        {
          videoId: this.videoId
        }
      )
    },
    moreText () {
      return this.$t(
        'more'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.video-section
  margin: 1em 0

.video-more-container
  @extend .d-flex, .justify-content-flex-end
</style>
