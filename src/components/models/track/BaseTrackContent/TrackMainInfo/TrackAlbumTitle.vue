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
import BaseLink from '@/links/BaseLink.vue'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import formatAlbumSourceParams
  from '#/actions/api/album/formatters/requestData'

export default {
  name: 'TrackAlbumTitle',
  components: {
    BaseLink
  },
  props: {
    albumData: {
      type: Object,
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
          artistName: this.artistName,
          sourceParams: this.sourceParams
        })
      }
    },
    albumTitle () {
      return this.albumData.title
    },
    sourceParams () {
      return formatAlbumSourceParams({
        sourceId: this.albumData.source_id,
        albumData: this.albumData,
        artistName: this.artistName
      })
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
