<template>
  <BaseListContainer class="selection">
    <ArtistItem
      v-for="artistData in artistsFormatted"
      :key="artistData.uuid"
      :artistData="artistData"
      :isWithListenersCount="isWithListenersCount"
      :isWithTracksCount="isWithTracksCount"
      :topTracksCount="topTracksCount"
      :isWithAlbumsCount="isWithAlbumsCount"
      :topAlbumsCount="topAlbumsCount"
      :isWithLibrary="isWithLibrary"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      :isWithLibraryLink="isWithLibraryLink"
      :isWithClearButton="isWithClearButton"
      @linkClick="handleLinkClick"
      @deleteButtonClick="handleDeleteButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/BaseListContainer.vue'
import ArtistItem from './BaseArtistsSimpleList/ArtistItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseArtistsSimpleList',
  components: {
    BaseListContainer,
    ArtistItem
  },
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    isWithListenersCount: Boolean,
    isWithTracksCount: Boolean,
    topTracksCount: Number,
    isWithAlbumsCount: Boolean,
    topAlbumsCount: Number,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryLink: Boolean,
    isWithClearButton: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
  ],
  computed: {
    artistsFormatted () {
      return formatCollection(
        this.artists
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
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
