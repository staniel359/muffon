<template>
  <BaseListContainer class="selection">
    <AlbumItem
      v-for="albumData in albumsFormatted"
      :key="albumData.uuid"
      :albumData="albumData"
      :isWithArtistName="isWithArtistName"
      :isWithListenersCount="isWithListenersCount"
      :scrollable="scrollable"
      @linkClick="handleLinkClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/BaseListContainer.vue'
import AlbumItem from './BaseAlbumsSimpleList/AlbumItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseAlbumsSimpleList',
  components: {
    BaseListContainer,
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
    isWithListenersCount: Boolean,
    scrollable: HTMLDivElement
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
