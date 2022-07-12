<template>
  <div class="title-options-section">
    <div class="title-section">
      <BaseHeader
        tag="h3"
        :text="videoTitle"
      />

      <BaseLink
        :link="videoChannelVideosLink"
        :text="channelTitle"
      />
    </div>

    <BaseVideoOptionsDropdown
      class="video-options"
      :share-data="shareData"
      is-with-share-option
    />
  </div>
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import BaseVideoOptionsDropdown
  from '*/components/dropdowns/video/BaseVideoOptionsDropdown.vue'
import {
  main as formatVideoChannelMainLink
} from '*/helpers/formatters/links/videoChannel'
import {
  video as formatVideoShareData
} from '*/helpers/formatters/share'

export default {
  name: 'TitleOptionsSection',
  components: {
    BaseHeader,
    BaseLink,
    BaseVideoOptionsDropdown
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    videoTitle () {
      return this.videoData.title
    },
    videoChannelVideosLink () {
      return formatVideoChannelMainLink(
        {
          channelId: this.channelId
        }
      )
    },
    channelId () {
      return this.channelData.source.id
    },
    channelData () {
      return this.videoData.channel
    },
    channelTitle () {
      return this.channelData.title
    },
    shareData () {
      return formatVideoShareData(
        this.videoData
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.title-options-section
  @extend .d-flex, .align-items-center
  margin-top: 0.75em

.title-section
  @extend .flex-full

.video-options
  margin-left: 1em
</style>
