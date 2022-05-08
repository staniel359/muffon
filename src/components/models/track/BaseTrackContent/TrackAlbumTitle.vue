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
import BaseLink from '*/components/links/BaseLink.vue'
import {
  main as formatAlbumMainLink
} from '*/helpers/formatters/links/album'
import {
  main as formatProfileLibraryAlbumMainLink
} from '*/helpers/formatters/links/profile/library/album'
import formatAlbumRequestData from '*/helpers/formatters/request/album/data'

export default {
  name: 'TrackAlbumTitle',
  components: {
    BaseLink
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
      if (this.isLinkToLibrary) {
        return this.profileLibraryAlbumMainLink
      } else {
        return this.albumMainLink
      }
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink(
        {
          profileId: this.profileId,
          libraryAlbumId: this.libraryAlbumId
        }
      )
    },
    libraryAlbumId () {
      return this.trackData.library.album.id
    },
    albumMainLink () {
      return formatAlbumMainLink(
        {
          albumTitle: this.albumTitle,
          artistName: this.artistName,
          sourceParams: this.sourceParams
        }
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    albumData () {
      return this.trackData.album
    },
    artistName () {
      return this.trackData.artist.name
    },
    sourceParams () {
      return formatAlbumRequestData(
        {
          sourceId: this.albumData.source_id,
          albumData: this.albumData,
          artistName: this.artistName
        }
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
