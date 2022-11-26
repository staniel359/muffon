<template>
  <div class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon
        source="youtube"
        size="large"
      />
    </div>

    <BaseDropdownContainer
      class="video-select"
      :header="headerText"
      :is-loading="isLoading"
      :is-error="isError"
      :is-disabled="!isAnyVideos"
      @select="handleSelect"
    >
      <VideoItem
        v-for="videoData in videosCollection"
        :key="videoData.uuid"
        :video-data="videoData"
      />
    </BaseDropdownContainer>
  </div>
</template>

<script>
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import VideoItem from './VideoSelect/VideoItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'VideoSelect',
  components: {
    BaseSourceIcon,
    BaseDropdownContainer,
    VideoItem
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
    headerText () {
      return this.$t(
        this.headerKey
      )
    },
    headerKey () {
      if (this.isError) {
        return 'error'
      } else if (this.isLoading) {
        return 'loading'
      } else if (!this.isAnyVideos) {
        return 'noCollection.header.videos'
      } else {
        return 'select.video'
      }
    },
    isAnyVideos () {
      return !!this.videos.length
    },
    videosCollection () {
      return formatCollection(
        this.videos
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      function isMatchedVideo (
        videoData
      ) {
        return (
          videoData.uuid === value
        )
      }

      const videoData =
        this.videosCollection.find(
          isMatchedVideo
        )

      this.setSelectedVideoData(
        videoData
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.video-select
  width: 225px
  @extend .no-margin
  ::v-deep(.image)
    width: 40px !important
</style>
