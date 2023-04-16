<template>
  <BaseListContainer
    class="selection"
  >
    <LyricsItem
      v-for="lyricsData in lyricsCollection"
      :key="lyricsData.uuid"
      :lyrics-data="lyricsData"
      @link-click="handleLinkClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import LyricsItem from './BaseLyricsSimpleList/LyricsItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseLyricsSimpleList',
  components: {
    BaseListContainer,
    LyricsItem
  },
  props: {
    lyrics: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'linkClick'
  ],
  computed: {
    lyricsCollection () {
      return formatCollection(
        this.lyrics
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
