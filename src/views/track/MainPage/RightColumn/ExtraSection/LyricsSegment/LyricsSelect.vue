<template>
  <div class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon
        source="genius"
      />
    </div>

    <BaseDropdownContainer
      class="main-source-select"
      :header="headerText"
      :is-loading="isLoading"
      :is-error="isError"
      :is-disabled="!isAnyTracks"
    >
      <TracksList
        :tracks="tracks"
      />
    </BaseDropdownContainer>
  </div>
</template>

<script>
import BaseSourceIcon from '@/components/BaseSourceIcon.vue'
import BaseDropdownContainer
  from '@/components/containers/BaseDropdownContainer.vue'
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
      return this.$t(
        this.headerKey
      )
    },
    headerKey () {
      if (this.isError) {
        return 'error'
      } else if (this.isLoading) {
        return 'loading'
      } else if (!this.isAnyTracks) {
        return 'noCollection.header.lyrics'
      } else {
        return 'select.lyrics'
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
