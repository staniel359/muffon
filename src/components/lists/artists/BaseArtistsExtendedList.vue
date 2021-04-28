<template>
  <div class="ui horizontal cards">
    <ArtistItem
      v-for="artistData in artistsFormatted"
      :key="artistData.uuid"
      :artistName="artistData.name"
    />
  </div>
</template>

<script>
import ArtistItem from './BaseArtistsExtendedList/ArtistItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseArtistsExtendedList',
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
      return formatCollection(this.artists)
    }
  }
}
</script>

<style lang="sass" scoped></style>
