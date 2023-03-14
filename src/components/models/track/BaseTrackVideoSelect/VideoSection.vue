<template>
  <div>
    <BaseVideo
      class="video-section"
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
  main as formatVideoMainLink
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
      return formatVideoMainLink(
        {
          videoId: this.videoId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.video-section
  margin: 1em 0
</style>
