<template>
  <div class="main-bottom-large-section">
    <BaseVideo
      :video-data="videoData"
      is-with-autoplay
    />

    <BaseMoreLinkButton
      :link="link"
    />
  </div>
</template>

<script>
import BaseVideo from '@/components/BaseVideo.vue'
import BaseMoreLinkButton from '@/components/buttons/BaseMoreLinkButton.vue'
import {
  main as formatVideoLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'VideoSection',
  components: {
    BaseVideo,
    BaseMoreLinkButton
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
    link () {
      return formatVideoLink(
        {
          videoId: this.videoId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
