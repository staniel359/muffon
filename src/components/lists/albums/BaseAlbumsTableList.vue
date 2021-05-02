<template>
  <div :class="[
    'ui',
    columnWidth,
    'column grid'
  ]">
    <div
      v-for="albumData in albumsFormatted"
      class="column"
      :key="albumData.uuid"
    >
      <AlbumItem
        :albumData="albumData"
        :artistName="artistName"
        :isWithArtistName="isWithArtistName"
      />
    </div>
  </div>
</template>

<script>
import AlbumItem from './BaseAlbumsTableList/AlbumItem.vue'
import { collection as formatCollection } from '#/formatters'
import { numberToColumnWidth } from '#/actions/plugins/semantic'

export default {
  name: 'BaseAlbumsTableList',
  components: {
    AlbumItem
  },
  props: {
    itemsInRow: {
      type: Number,
      required: true
    },
    albums: {
      type: Array,
      default () {
        return []
      }
    },
    artistName: String,
    isWithArtistName: Boolean
  },
  computed: {
    albumsFormatted () {
      return formatCollection(this.albums)
    },
    columnWidth () {
      return numberToColumnWidth(this.itemsInRow)
    }
  }
}
</script>

<style lang="sass" scoped></style>
