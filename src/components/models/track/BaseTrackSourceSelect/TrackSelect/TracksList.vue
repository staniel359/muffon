<template>
  <TrackItem
    v-for="trackData in tracksCollection"
    :key="trackData.uuid"
    :trackData="trackData"
  />
</template>

<script>
import TrackItem from './TracksList/TrackItem.vue'
import { collection as formatCollection } from '*/helpers/formatters'

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
    tracksCollection () {
      return formatCollection(
        this.tracks
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
