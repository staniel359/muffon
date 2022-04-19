<template>
  <BaseLibraryOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseLibraryOption from '../options/BaseLibraryOption.vue'
import createLibraryAlbum from '*/helpers/actions/api/library/album/create'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

export default {
  name: 'AlbumOption',
  components: {
    BaseLibraryOption
  },
  inject: [
    'setLibraryId'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    },
    albumTitle: {
      type: String,
      required: true
    },
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    imageUrl: String
  },
  data () {
    return {
      libraryId: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    createArgs () {
      return {
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        tracks: this.tracksFormatted,
        imageUrl: this.imageUrl
      }
    },
    tracksFormatted () {
      return this.tracks.map(
        this.formatTrack
      )
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createLibraryAlbum,
    handleClick () {
      this.createLibraryAlbum(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setLibraryId(
          this.libraryId
        )
      }
    },
    formatTrack (
      trackData
    ) {
      const artistName =
        formatArtistName(
          trackData.artists
        )

      const artistData = {
        name: artistName
      }

      return {
        title: trackData.title,
        artist: artistData
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
