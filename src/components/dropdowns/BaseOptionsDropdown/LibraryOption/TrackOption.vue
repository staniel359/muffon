<template>
  <BaseLibraryOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseLibraryOption from '../options/BaseLibraryOption.vue'
import createLibraryTrack from '*/helpers/actions/api/library/track/create'

export default {
  name: 'TrackOption',
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
    trackTitle: {
      type: String,
      required: true
    },
    albumTitle: String,
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
        trackTitle: this.trackTitle,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createLibraryTrack,
    handleClick () {
      this.createLibraryTrack(
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
