<template>
  <ArtistItem
    v-for="artistData in artistsFormatted"
    :key="artistData.uuid"
    :artistData="artistData"
  />
</template>

<script>
import ArtistItem from './ArtistsList/ArtistItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'ArtistsList',
  components: {
    ArtistItem
  },
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    artistsFormatted () {
      return formatCollection(
        this.artists
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
