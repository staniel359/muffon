<template>
  <div class="ui middle aligned selection list">
    <AlbumItem
      v-for="albumData in albumsFormatted"
      :key="albumData.uuid"
      :albumData="albumData"
      :isWithArtistName="isWithArtistName"
      :isWithListenersCount="isWithListenersCount"
      @linkClick="handleLinkClick"
    />
  </div>
</template>

<script>
import AlbumItem from './BaseAlbumsSimpleList/AlbumItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseAlbumsSimpleList',
  components: {
    AlbumItem
  },
  props: {
    albums: {
      type: Array,
      default () {
        return []
      }
    },
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    albumsFormatted () {
      return formatCollection(this.albums)
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
