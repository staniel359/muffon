<template>
  <TrackItem
    v-for="trackData in tracksFormatted"
    :key="trackData.uuid"
    :trackData="trackData"
  />
</template>

<script>
import TrackItem from './TracksList/TrackItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'TracksList',
  components: {
    TrackItem
  },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    tracksFormatted () {
      return formatCollection(
        this.tracks
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
