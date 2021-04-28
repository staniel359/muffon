<template>
  <div :class="[
    'ui',
    columnWidth,
    'column grid'
  ]">
    <div
      v-for="artistData in artistsFormatted"
      class="column"
      :key="artistData.uuid"
    >
      <ArtistItem
        :artistData="artistData"
        :isSmall="isSmall"
        :isWithListenersCount="isWithListenersCount"
      />
    </div>
  </div>
</template>

<script>
import ArtistItem from './BaseArtistsTableList/ArtistItem.vue'
import { collection as formatCollection } from '#/formatters'
import { numberToColumnWidth } from '#/actions/plugins/semantic'

export default {
  name: 'BaseArtistsTableList',
  components: {
    ArtistItem
  },
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    itemsInRow: Number,
    isSmall: Boolean,
    isWithListenersCount: Boolean
  },
  computed: {
    artistsFormatted () {
      return formatCollection(this.artists)
    },
    columnWidth () {
      return numberToColumnWidth(this.itemsInRow)
    }
  }
}
</script>

<style lang="sass" scoped>
.card
  @extend .w-100
</style>
