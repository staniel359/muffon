<template>
  <div class="lyrics-select-container">
    <BaseSourceIcon
      class="left"
      source="genius"
    />

    <BaseDropdownContainer
      class="lyrics-select"
      :header="headerText"
      :is-loading="isLoading"
      :is-error="isError"
      :is-disabled="!isAnyTracks"
      @select="handleSelect"
    >
      <TrackItem
        v-for="trackData in tracksCollection"
        :key="trackData.uuid"
        :track-data="trackData"
      />
    </BaseDropdownContainer>
  </div>
</template>

<script>
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import TrackItem from './LyricsSelect/TrackItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'LyricsSelect',
  components: {
    BaseSourceIcon,
    BaseDropdownContainer,
    TrackItem
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
    },
    tracksCollection () {
      return formatCollection(
        this.tracks
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      function isMatchedTrack (
        trackData
      ) {
        return (
          trackData.uuid === value
        )
      }

      const trackData =
        this.tracksCollection.find(
          isMatchedTrack
        )

      this.setSelectedTrackData(
        trackData
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.lyrics-select-container
  @extend .d-flex, .align-items-center

.lyrics-select
  width: 225px
</style>
