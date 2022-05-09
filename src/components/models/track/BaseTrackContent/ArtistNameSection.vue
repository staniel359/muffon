<template>
  <span>
    <BaseLink
      v-if="isLinkToLibrary"
      :link="link"
      :text="artistName"
      @click="handleLinkClick"
    />
    <BaseArtistLinks
      v-else
      :artists="artists"
      @link-click="handleLinkClick"
    />
  </span>
</template>

<script>
import BaseLink from '*/components/links/BaseLink.vue'
import BaseArtistLinks from '*/components/links/BaseArtistLinks.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '*/helpers/formatters/links/profile/library/artist'

export default {
  name: 'ArtistNameSection',
  components: {
    BaseLink,
    BaseArtistLinks
  },
  props: {
    trackData: {
      type: Object,
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
      return formatProfileLibraryArtistMainLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
        }
      )
    },
    libraryArtistId () {
      return this.trackData.library.artist.id
    },
    artistName () {
      return this.trackData.artist.name
    },
    artists () {
      return this.trackData.artists
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
