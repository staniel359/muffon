<template>
  <div class="ui segment main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <i class="youtube large colored icon"></i>
    </div>

    <div
      class="ui scrolling floating dropdown main-dropdown"
      ref="dropdown"
      :class="{ disabled: !isAnyVideos }"
    >
      <div class="text main-dropdown-item">
        {{ headerFormatted }}
      </div>

      <BaseIcon
        class="main-dropdown-icon main-dropdown-right-icon"
        icon="dropdown"
        :isLoading="isLoading"
        :isError="isError"
      />

      <VideosList :videos="videos" />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/BaseIcon.vue'
import VideosList from './VideoSelect/VideosList.vue'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { setDropdown, selectDropdownValue } from '#/actions/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'VideoSelect',
  components: {
    BaseIcon,
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
    isAnyVideos () {
      return !!this.videos.length
    },
    headerFormatted () {
      if (this.isShowHeader) {
        return localize(
          `pages.track.videos.${this.headerKey}`
        )
      } else {
        return null
      }
    },
    isShowHeader () {
      return (
        !this.isAnyVideos &&
          this.headerKey
      )
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
    }
  },
  watch: {
    videos: 'handleVideosChange'
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown,
      mainDropdownOptions()
    )
  },
  methods: {
    handleVideosChange (value) {
      if (value.length) {
        this.selectFirstVideo()
      }
    },
    selectFirstVideo () {
      this.setSelectedVideoData(
        this.videos[0]
      )

      this.$nextTick(() => {
        selectDropdownValue(
          this.$refs.dropdown, 0
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.main-dropdown
  width: $trackPageDropdownWidth
</style>
