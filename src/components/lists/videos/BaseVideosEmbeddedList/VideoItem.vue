<template>
  <div class="video-item">
    <BaseVideo
      :video-data="videoData"
    />

    <BaseLinkContainer
      :link="link"
    >
      <BaseHeader
        class="video-title link"
        tag="h4"
        :text="title"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseVideo from '*/components/BaseVideo.vue'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import {
  main as formatVideoMainLink
} from '*/helpers/formatters/links/video'

export default {
  name: 'VideoItem',
  components: {
    BaseVideo,
    BaseLinkContainer,
    BaseHeader
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    link () {
      return formatVideoMainLink(
        {
          videoId: this.videoId
        }
      )
    },
    videoId () {
      return this.videoData.source.id
    },
    title () {
      return this.videoData.title
    }
  }
}
</script>

<style lang="sass" scoped>
.video-item
  &:not(:first-child)
    margin-top: 0.75em

.video-title
  margin-top: 0.35em !important
</style>
