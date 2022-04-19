<template>
  <BaseLibraryOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseLibraryOption from '../options/BaseLibraryOption.vue'
import createLibraryArtist from '*/helpers/actions/api/library/artist/create'

export default {
  name: 'ArtistOption',
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
        artistName: this.artistName
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createLibraryArtist,
    handleClick () {
      this.createLibraryArtist(
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
