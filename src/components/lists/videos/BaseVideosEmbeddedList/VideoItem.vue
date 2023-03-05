<template>
  <div class="video-item">
    <BaseVideo
      :video-data="videoData"
    />

    <div class="title-options-container">
      <BaseLinkContainer
        :link="link"
      >
        <BaseHeader
          class="link"
          tag="h4"
          :text="title"
        />
      </BaseLinkContainer>

      <BaseVideoOptionsDropdown
        class="video-options"
        :video-data="videoData"
        is-with-share-option
      />
    </div>
  </div>
</template>

<script>
import BaseVideo from '@/components/BaseVideo.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoOptionsDropdown
  from '@/components/dropdowns/video/BaseVideoOptionsDropdown.vue'
import {
  main as formatVideoMainLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'VideoItem',
  components: {
    BaseVideo,
    BaseLinkContainer,
    BaseHeader,
    BaseVideoOptionsDropdown
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

.title-options-container
  @extend .d-flex, .align-items-center, .justify-content-space-between
  margin-top: 0.5em !important

.video-options
  margin-left: 0.75em
</style>
