<template>
  <div class="menu albums-list">
    <AlbumItem
      v-for="albumData in albumsFormatted"
      :key="albumData.uuid"
      :albumData="albumData"
    />
  </div>
</template>

<script>
import AlbumItem from './AlbumsList/AlbumItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'AlbumsList',
  components: {
    AlbumItem
  },
  props: {
    albums: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    albumsFormatted () {
      return formatCollection(this.albums)
    }
  }
}
</script>

<style lang="sass" scoped>
.ui.dropdown .albums-list
  width: $albumSourceSelectMenuWidth !important
</style>
