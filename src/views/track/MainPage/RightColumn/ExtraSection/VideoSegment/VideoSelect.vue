<template>
  <div class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon
        sourceId="youtube"
        size="large"
      />
    </div>

    <BaseDropdownContainer
      class="main-source-select-track-select"
      :header="headerText"
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
    headerText () {
      if (this.isError) {
        return this.errorText
      } else {
        return this.headerKeyText
      }
    },
    errorText () {
      return this.$t(
        'shared.error'
      )
    },
    headerKeyText () {
      return this.$t(
        `pages.track.videos.${this.headerKey}`
      )
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
.main-source-select-track-select
  @extend .no-margin
  ::v-deep(.image)
    width: 40px
</style>
