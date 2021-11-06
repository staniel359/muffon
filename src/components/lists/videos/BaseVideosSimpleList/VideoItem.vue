<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="linkFormatted"
    @click="handleLinkClick"
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

      <div class="main-small-container">
        <small>
          {{ publishDate }}
        </small>
      </div>
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseImage from '@/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import { main as formatVideoMainLink } from '#/formatters/links/video'

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
  emits: [
    'linkClick'
  ],
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
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.video-image
  width: 112px
  height: 63px
  margin-right: 0.5em !important

.content
  @extend .no-padding
</style>
