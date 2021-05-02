<template>
  <BaseListContainer class="selection">
    <ArtistItem
      v-for="artistData in artistsFormatted"
      :key="artistData.uuid"
      :artistData="artistData"
      :scrollable="scrollable"
      @linkClick="handleLinkClick"
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
    scrollable: HTMLDivElement
  },
  emits: [
    'linkClick'
  ],
  computed: {
    artistsFormatted () {
      return formatCollection(this.artists)
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
