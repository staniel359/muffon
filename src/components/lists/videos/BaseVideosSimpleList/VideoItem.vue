<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="videoMainLink"
    @click="handleLinkClick"
  >
    <BaseImage
      class="rounded bordered video-image"
      model="video"
      :image="imageData?.small"
    />

    <div class="content">
      <BaseHeader
        tag="h4"
        :class="{ link: isMainLinkActive }"
        :text="videoTitle"
      />

      <BaseLink
        v-if="isWithChannelTitle"
        :link="videoChannelVideosLink"
        :text="channelTitle"
        @click="handleLinkClick"
        @mouseenter="handleChannelLinkMouseEnter"
        @mouseleave="handleChannelLinkMouseLeave"
      />

      <div class="description main-small-container">
        <small>
          {{ publishDate }}
        </small>
      </div>
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import { main as formatVideoMainLink } from '*/helpers/formatters/links/video'
import {
  videos as formatVideoChannelVideosLink
} from '*/helpers/formatters/links/videoChannel'

export default {
  name: 'VideoItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseLink
  },
  props: {
    videoData: {
      type: Object,
      required: true
    },
    isWithChannelTitle: Boolean
  },
  data () {
    return {
      isMainLinkActive: true
    }
  },
  emits: [
    'linkClick'
  ],
  computed: {
    videoMainLink () {
      return formatVideoMainLink({
        videoId: this.videoId
      })
    },
    videoId () {
      return this.videoData.youtube_id
    },
    imageData () {
      return this.videoData.image
    },
    videoTitle () {
      return this.videoData.title
    },
    publishDate () {
      return this.videoData.publish_date
    },
    channelData () {
      return this.videoData.channel
    },
    videoChannelVideosLink () {
      return formatVideoChannelVideosLink({
        channelId: this.channelId,
        channelTitle: this.channelTitle
      })
    },
    channelId () {
      return this.channelData.youtube_id
    },
    channelTitle () {
      return this.channelData.title
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleChannelLinkMouseEnter () {
      this.isMainLinkActive = false
    },
    handleChannelLinkMouseLeave () {
      this.isMainLinkActive = true
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
