<template>
  <BaseBookmarkOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption from '../options/BaseBookmarkOption.vue'
import createBookmarkArtist from '*/helpers/actions/api/bookmark/artist/create'

export default {
  name: 'ArtistOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      bookmarkId: null,
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
    createBookmarkArtist,
    handleClick () {
      this.createBookmarkArtist(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setBookmarkId(
          this.bookmarkId
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
