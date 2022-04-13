<template>
  <BaseHeader
    tag="h3"
    :text="videoTitle"
  />

  <BaseLink
    :link="videoChannelVideosLink"
    :text="channelTitle"
  />
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import {
  videos as formatVideoChannelVideosLink
} from '*/helpers/formatters/links/videoChannel'

export default {
  name: 'TitleSection',
  components: {
    BaseHeader,
    BaseLink
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
      return formatVideoChannelVideosLink(
        {
          channelId: this.channelId,
          channelTitle: this.channelTitle
        }
      )
    },
    channelId () {
      return this.channelData.youtube_id
    },
    channelData () {
      return this.videoData.channel
    },
    channelTitle () {
      return this.channelData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
