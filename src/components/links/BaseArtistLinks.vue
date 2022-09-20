<template>
  <ArtistLink
    v-for="(artistData, index) in artistsCollection"
    :key="artistData.uuid"
    :artist-data="artistData"
    :index="index"
    @link-active-change="handleLinkActiveChange"
    @link-click="handleLinkClick"
  />
</template>

<script>
import ArtistLink from './BaseArtistLinks/ArtistLink.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseArtistLinks',
  components: {
    ArtistLink
  },
  props: {
    artists: Array
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    artistsCollection () {
      return formatCollection(
        this.artists
      )
    }
  },
  methods: {
    handleLinkActiveChange (
      value
    ) {
      this.$emit(
        'linkActiveChange',
        value
      )
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
