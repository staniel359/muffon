<template>
  <BaseSegmentContainer class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon
        sourceId="youtube"
        size="large"
      />
    </div>

    <BaseDropdownContainer
      class="scrolling floating video-select"
      ref="dropdown"
      icon="dropdown"
      :header="headerFormatted"
      :isLoading="isLoading"
      :isError="isError"
      :isDisabled="!isAnyVideos"
    >
      <VideosList :videos="videos" />
    </BaseDropdownContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import VideosList from './VideoSelect/VideosList.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'VideoSelect',
  components: {
    BaseSegmentContainer,
    BaseSourceIcon,
    BaseDropdownContainer,
    VideosList
  },
  inject: [
    'setSelectedVideoData'
  ],
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
      if (this.headerKey) {
        return localize(
          `pages.track.videos.${this.headerKey}`
        )
      } else {
        return null
      }
    },
    headerKey () {
      if (this.isLoading) {
        return 'loading'
      } else if (this.isError) {
        return 'error'
      } else if (!this.isAnyVideos) {
        return 'empty'
      } else {
        return null
      }
    },
    isAnyVideos () {
      return !!this.videos.length
    }
  },
  watch: {
    isAnyVideos: 'handleIsAnyVideosChange'
  },
  methods: {
    handleIsAnyVideosChange (value) {
      value && this.selectFirstVideo()
    },
    selectFirstVideo () {
      this.$nextTick(() => {
        this.setSelectedVideoData(
          this.videos[0]
        )

        this.$refs.dropdown.setValue(0)
      })
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
