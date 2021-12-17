<template>
  <div class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon sourceId="genius" />
    </div>

    <BaseDropdownContainer
      class="main-source-select-track-select"
      :header="headerText"
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
    headerText () {
      if (this.isError) {
        return this.errorText
      } else {
        return this.headerKeyText
      }
    },
    errorText () {
      return this.$t(
        'error'
      )
    },
    headerKeyText () {
      return this.$t(
        `lyrics.${this.headerKey}`
      )
    },
    headerKey () {
      if (this.isLoading) {
        return 'loading'
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
.main-source-select-track-select
  @extend .no-margin
</style>
