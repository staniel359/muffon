<template>
  <BaseBookmarkOption
    action="add"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption
  from '@/components/popups/options/BaseBookmarkOption.vue'
import createBookmarkAlbum from '@/helpers/actions/api/bookmark/album/create'

export default {
  name: 'AddOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      bookmarkId: null,
      isLoading: false,
      isError: false,
      isSuccess: false
    }
  },
  computed: {
    createArgs () {
      return {
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl,
        sourceData: this.sourceData
      }
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    },
    imageUrl () {
      return this.albumData.image?.large
    },
    sourceData () {
      return this.albumData.source
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
