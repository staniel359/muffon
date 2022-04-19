<template>
  <BaseBookmarkOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption from '../options/BaseBookmarkOption.vue'
import createBookmarkAlbum from '*/helpers/actions/api/bookmark/album/create'

export default {
  name: 'AlbumOption',
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
    },
    albumTitle: {
      type: String,
      required: true
    },
    imageUrl: String
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
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createBookmarkAlbum,
    handleClick () {
      this.createBookmarkAlbum(
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
