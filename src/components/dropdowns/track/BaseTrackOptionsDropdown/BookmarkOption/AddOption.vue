<template>
  <BaseBookmarkOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption
  from '*/components/dropdowns/options/bookmark/BaseBookmarkOption.vue'
import createBookmarkTrack from '*/helpers/actions/api/bookmark/track/create'

export default {
  name: 'AddOption',
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
    trackTitle: {
      type: String,
      required: true
    },
    albumTitle: String,
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
    createBookmarkTrack,
    handleClick () {
      this.createBookmarkTrack(
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
