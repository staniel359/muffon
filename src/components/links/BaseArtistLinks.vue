<template>
  <ArtistLink
    v-for="(artistData, index) in artistsCollection"
    :key="artistData.uuid"
    :artistData="artistData"
    :index="index"
    :isLinkToLibrary="isLinkToLibrary"
    :profileId="profileId"
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
    isLinkToLibrary: Boolean,
    profileId: String
  },
  emits: [
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
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
