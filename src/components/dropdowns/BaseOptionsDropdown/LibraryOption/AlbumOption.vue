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
        tracks: this.tracks,
        imageUrl: this.imageUrl
      }
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
