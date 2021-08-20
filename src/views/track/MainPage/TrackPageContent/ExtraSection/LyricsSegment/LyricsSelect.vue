<template>
  <div class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon sourceId="genius" />
    </div>

    <BaseDropdownContainer
      class="scrolling floating track-select"
      icon="dropdown"
      :header="headerFormatted"
      :isLoading="isLoading"
      :isError="isError"
      :isDisabled="!isAnyTracks"
    >
      <TracksList :tracks="tracks" />
    </BaseDropdownContainer>
  </div>
</template>

<script>
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import TracksList from './LyricsSelect/TracksList.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'LyricsSelect',
  components: {
    BaseSourceIcon,
    BaseDropdownContainer,
    TracksList
  },
  props: {
    tracks: {
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
      return localize(
        `pages.track.lyrics.${this.headerKey}`
      )
    },
    headerKey () {
      if (this.isLoading) {
        return 'loading'
      } else if (this.isError) {
        return 'error'
      } else if (!this.isAnyTracks) {
        return 'empty'
      } else {
        return 'select'
      }
    },
    isAnyTracks () {
      return !!this.tracks.length
    }
  }
}
</script>

<style lang="sass" scoped>
.track-select
  width: $trackPageDropdownWidth
</style>
