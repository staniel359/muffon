<template>
  <BaseListContainer class="selection">
    <AlbumItem
      v-for="albumData in albumsFormatted"
      :key="albumData.uuid"
      :albumData="albumData"
      :isWithArtistName="isWithArtistName"
      :isWithListenersCount="isWithListenersCount"
      :isWithLibraryLink="isWithLibraryLink"
      :isWithClearButton="isWithClearButton"
      :isWithListenedButton="isWithListenedButton"
      :isWithBookmarkButton="isWithBookmarkButton"
      :isBookmark="isBookmark"
      @linkClick="handleLinkClick"
      @deleteButtonClick="handleDeleteButtonClick"
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
    isWithLibraryLink: Boolean,
    isWithClearButton: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean,
    isBookmark: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
  ],
  computed: {
    albumsFormatted () {
      return formatCollection(this.albums)
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleDeleteButtonClick ({ uuid }) {
      this.$emit(
        'deleteButtonClick',
        { uuid }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
