<template>
  <div class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon
        sourceId="youtube"
        size="large"
      />
    </div>

    <BaseDropdownContainer
      class="scrolling floating video-select"
      icon="dropdown"
      :header="headerFormatted"
      :isLoading="isLoading"
      :isError="isError"
      :isDisabled="!isAnyVideos"
    >
      <VideosList :videos="videos" />
    </BaseDropdownContainer>
  </div>
</template>

<script>
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import VideosList from './VideoSelect/VideosList.vue'

export default {
  name: 'VideoSelect',
  components: {
    BaseSourceIcon,
    BaseDropdownContainer,
    VideosList
  },
  props: {
    videos: {
      type: Array,
      default () {
        return []
      }
    },
    isLoading: Boolean,
    isError: Boolean
  },
  computed: {
    headerFormatted () {
      if (this.isError) {
        return this.$t(
          'shared.error'
        )
      } else {
        return this.$t(
          `pages.track.videos.${this.headerKey}`
        )
      }
    },
    headerKey () {
      if (this.isLoading) {
        return 'loading'
      } else if (!this.isAnyVideos) {
        return 'empty'
      } else {
        return 'select'
      }
    },
    isAnyVideos () {
      return !!this.videos.length
    }
  }
}
</script>

<style lang="sass" scoped>
.video-select
  width: $trackPageDropdownWidth
  ::v-deep(.image)
    width: 40px
</style>
