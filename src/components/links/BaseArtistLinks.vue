<template>
  <ArtistLink
    v-for="(artistData, index) in artistsCollection"
    :key="artistData.uuid"
    :artistData="artistData"
    :index="index"
    :isLinkToLibrary="isLinkToLibrary"
    :profileId="profileId"
    :artistId="artistId"
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
    artistName: String,
    isLinkToLibrary: Boolean,
    profileId: String,
    artistId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    artistsCollection () {
      return formatCollection(
        this.artists || [this.artist]
      )
    },
    artist () {
      return {
        id: this.artistId,
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
