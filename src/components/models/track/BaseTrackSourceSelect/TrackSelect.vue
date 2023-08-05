<template>
  <BaseDropdownContainer
    :header="headerText"
    @select="handleSelect"
  >
    <TrackItem
      v-for="trackData in tracksCollection"
      :key="trackData.uuid"
      :track-data="trackData"
    />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer
  from '@/components/containers/dropdowns/BaseDropdownContainer.vue'
import TrackItem from './TrackSelect/TrackItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'TrackSelect',
  components: {
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
    }
  },
  computed: {
    headerText () {
      return this.$t(
        'select.track'
      )
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

<style lang="sass" scoped></style>
