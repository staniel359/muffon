<template>
  <div class="description main-small-container">
    <small>
      <BaseLink
        :link="link"
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
    link () {
      if (this.isLinkToLibrary) {
        return this.profileLibraryAlbumMainLink
      } else {
        return this.albumMainLink
      }
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink({
        profileId: this.profileId,
        albumId: this.albumId
      })
    },
    albumMainLink () {
      return formatAlbumMainLink({
        albumTitle: this.albumTitle,
        artistName: this.artistName,
        sourceParams: this.sourceParams
      })
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
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
