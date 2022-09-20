<template>
  <div>
    <BaseVideo
      class="video-section"
      :video-data="selectedVideoData"
      is-with-autoplay
      @click="handleClick"
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
  name: 'VideoData',
  components: {
    BaseVideo,
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
    videoId () {
      return this.selectedVideoData.source.id
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

<style lang="sass" scoped>
.video-section
  margin: 1em 0

.video-more-container
  @extend .d-flex, .justify-content-flex-end
</style>
