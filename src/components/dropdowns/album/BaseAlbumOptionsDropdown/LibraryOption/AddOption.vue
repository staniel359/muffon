<template>
  <BaseLibraryOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseLibraryOption
  from '@/components/dropdowns/options/library/BaseLibraryOption.vue'
import createLibraryAlbum from '@/helpers/actions/api/library/album/create'

export default {
  name: 'AddOption',
  components: {
    BaseLibraryOption
  },
  inject: [
    'setLibraryId'
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    }
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
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    },
    tracks () {
      return this.albumData.tracks
    },
    imageUrl () {
      return this.albumData.image?.large
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
