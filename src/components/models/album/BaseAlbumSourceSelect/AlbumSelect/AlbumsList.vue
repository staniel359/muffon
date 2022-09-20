<template>
  <AlbumItem
    v-for="albumData in albumsCollection"
    :key="albumData.uuid"
    :album-data="albumData"
  />
</template>

<script>
import AlbumItem from './AlbumsList/AlbumItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

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
    albumsCollection () {
      return formatCollection(
        this.albums
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
