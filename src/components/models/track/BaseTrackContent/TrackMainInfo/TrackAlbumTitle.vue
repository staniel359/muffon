<template>
  <div class="description main-small-container">
    <small>
      <BaseLink
        :link="albumMainLinkFormatted"
        :text="albumTitle"
        @click="handleLinkClick"
      />
    </small>
  </div>
</template>

<script>
import BaseLink from '@/BaseLink.vue'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'

export default {
  name: 'TrackAlbumTitle',
  components: {
    BaseLink
  },
  props: {
    albumTitle: {
      type: String,
      required: true
    },
    artistName: String,
    isLinkToLibrary: Boolean,
    profileId: String,
    albumId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    albumMainLinkFormatted () {
      if (this.isLinkToLibrary) {
        return formatProfileLibraryAlbumMainLink({
          profileId: this.profileId,
          albumId: this.albumId
        })
      } else {
        return formatAlbumMainLink({
          albumTitle: this.albumTitle,
          artistName: this.artistName
        })
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
