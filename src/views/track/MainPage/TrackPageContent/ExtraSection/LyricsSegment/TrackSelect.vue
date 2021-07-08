<template>
  <BaseSegmentContainer class="main-track-dropdown-container">
    <div class="main-track-dropdown-logo-container">
      <BaseSourceIcon sourceId="genius" />
    </div>

    <BaseDropdownContainer
      class="scrolling floating track-select"
      ref="dropdown"
      icon="dropdown"
      :header="headerFormatted"
      :isLoading="isLoading"
      :isError="isError"
      :isDisabled="!isAnyTracks"
    >
      <TracksList :tracks="tracks" />
    </BaseDropdownContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseSourceIcon from '@/BaseSourceIcon.vue'
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import TracksList from './TrackSelect/TracksList.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'TrackSelect',
  components: {
    BaseSegmentContainer,
    BaseSourceIcon,
    BaseDropdownContainer,
    TracksList
  },
  inject: [
    'setSelectedTrackData'
  ],
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
      if (this.headerKey) {
        return localize(
          `pages.track.lyrics.${this.headerKey}`
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
      } else if (!this.isAnyTracks) {
        return 'empty'
      } else {
        return null
      }
    },
    isAnyTracks () {
      return !!this.tracks.length
    }
  },
  watch: {
    isAnyTracks: 'handleIsAnyTracksChange'
  },
  methods: {
    handleIsAnyTracksChange (value) {
      value && this.selectFirstTrack()
    },
    selectFirstTrack () {
      this.$nextTick(() => {
        this.setSelectedTrackData(
          this.tracks[0]
        )

        this.$refs.dropdown.setValue(0)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.track-select
  width: $trackPageDropdownWidth
</style>
