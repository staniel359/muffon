<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="linkFormatted"
  >
    <BaseImage
      class="rounded bordered video-image"
      :image="image"
    />

    <div class="content">
      <BaseHeader
        class="link"
        tag="h4"
        :text="videoTitle"
      />

      <small>
        {{ publishDate }}
      </small>
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseImage from '@/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import { videoMain as formatVideoMainLink } from '#/formatters/links'

export default {
  name: 'VideoItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    linkFormatted () {
      return formatVideoMainLink({
        videoId: this.videoId
      })
    },
    videoId () {
      return this.videoData.youtube_id
    },
    image () {
      return this.videoData.image.small
    },
    videoTitle () {
      return this.videoData.title
    },
    publishDate () {
      return this.videoData.publish_date
    }
  }
}
</script>

<style lang="sass" scoped>
.video-image
  width: 112px
  height: 63px
  margin-right: 10px !important

.content
  @extend .no-padding
</style>
