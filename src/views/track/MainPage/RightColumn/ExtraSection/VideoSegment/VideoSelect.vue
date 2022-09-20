<template>
  <div class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon
        source="youtube"
        size="large"
      />
    </div>

    <BaseDropdownContainer
      class="main-source-select"
      :header="headerText"
      :is-loading="isLoading"
      :is-error="isError"
      :is-disabled="!isAnyVideos"
    >
      <VideosList
        :videos="videos"
      />
    </BaseDropdownContainer>
  </div>
</template>

<script>
import BaseSourceIcon from '@/components/BaseSourceIcon.vue'
import BaseDropdownContainer
  from '@/components/containers/BaseDropdownContainer.vue'
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
    }
  }
}
</script>

<style lang="sass" scoped>
.main-source-select
  @extend .no-margin
  ::v-deep(.image)
    width: 40px
</style>
