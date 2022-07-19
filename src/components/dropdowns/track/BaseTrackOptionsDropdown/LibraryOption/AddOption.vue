<template>
  <BaseLibraryOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseLibraryOption
  from '*/components/dropdowns/options/library/BaseLibraryOption.vue'
import createLibraryTrack from '*/helpers/actions/api/library/track/create'

export default {
  name: 'AddOption',
  components: {
    BaseLibraryOption
  },
  inject: [
    'setLibraryId'
  ],
  props: {
    trackData: {
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
        trackTitle: this.trackTitle,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    albumTitle () {
      return this.trackData.album?.title
    },
    imageUrl () {
      return this.trackData.image?.large
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
