<template>
  <div class="menu main-track-dropdown-menu">
    <TrackItem
      v-for="(trackData, index) in tracksFormatted"
      :key="trackData.uuid"
      :trackData="trackData"
      :index="index"
    />
  </div>
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
