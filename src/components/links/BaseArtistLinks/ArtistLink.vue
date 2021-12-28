<template>
  <span v-if="index">, </span>

  <BaseLink
    :link="link"
    :text="artistName"
    @click="handleClick"
  />
</template>

<script>
import BaseLink from '@/links/BaseLink.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'ArtistLink',
  components: {
    BaseLink
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isLinkToLibrary) {
        return this.profileLibraryArtistMainLink
      } else {
        return this.artistMainLink
      }
    },
    profileLibraryArtistMainLink () {
      return formatProfileLibraryArtistMainLink({
        profileId: this.profileId,
        artistId: this.artistId
      })
    },
    artistId () {
      return this.artistData.id
    },
    artistMainLink () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return this.artistData.name
    }
  },
  methods: {
    handleClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
