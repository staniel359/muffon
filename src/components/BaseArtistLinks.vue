<template>
  <ArtistLink
    v-for="(artistData, index) in artistsFormatted"
    :key="artistData.uuid"
    :artistData="artistData"
    :index="index"
    @linkClick="handleLinkClick"
  />
</template>

<script>
import ArtistLink from './BaseArtistLinks/ArtistLink.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseArtistLinks',
  components: {
    ArtistLink
  },
  props: {
    artists: Array,
    artistName: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    artistsFormatted () {
      return formatCollection(
        this.artists || [this.artist]
      )
    },
    artist () {
      return {
        name: this.artistName
      }
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
