<template>
  <span>
    <BaseLink
      v-if="isLinkToLibrary"
      :link="link"
      :text="artistName"
      @active-change="handleLinkActiveChange"
      @click="handleLinkClick"
    />
    <BaseArtistLinks
      v-else
      :artists="artists"
      @link-active-change="handleLinkActiveChange"
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
  name: 'BaseAlbumArtistNamesSection',
  components: {
    BaseLink,
    BaseArtistLinks
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: String
  },
  emits: [
    'linkActiveChange',
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
      return this.albumData.library.artist.id
    },
    artistName () {
      return this.albumData.artist.name
    },
    artists () {
      return this.albumData.artists
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
