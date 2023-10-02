<template>
  <div class="main-list-bottom-section media-item main-visibility-container">
    <BaseVideo
      :video-data="videoData"
    />

    <div class="middle-aligned-space-between main-bottom-mini-section">
      <BaseLinkContainer
        :link="link"
      >
        <BaseHeader
          class="link"
          tag="h4"
          :text="title"
        />
      </BaseLinkContainer>

      <BaseVideoOptionsPopup
        class="main-right-small-section invisible-item"
        :video-data="videoData"
        is-with-share-option
        is-with-external-link-option
      />
    </div>
  </div>
</template>

<script>
import BaseVideo from '@/components/BaseVideo.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoOptionsPopup
  from '@/components/popups/video/BaseVideoOptionsPopup.vue'
import {
  main as formatVideoLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'VideoItem',
  components: {
    BaseVideo,
    BaseLinkContainer,
    BaseHeader,
    BaseVideoOptionsPopup
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    link () {
      return formatVideoLink(
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

<style lang="sass" scoped></style>
