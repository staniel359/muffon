<template>
  <ArtistLink
    v-for="(artistData, index) in artistsCollection"
    :key="artistData.uuid"
    :artist-data="artistData"
    :index="index"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    @link-click="handleLinkClick"
  />
</template>

<script>
import ArtistLink from './BaseArtistLinks/ArtistLink.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

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
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
