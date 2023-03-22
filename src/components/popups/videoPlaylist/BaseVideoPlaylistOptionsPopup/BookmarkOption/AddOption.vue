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
import createBookmarkVideoPlaylist
  from '@/helpers/actions/api/bookmark/videoPlaylist/create'

export default {
  name: 'AddOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    playlistData: {
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
        playlistId: this.playlistId
      }
    },
    playlistId () {
      return this.playlistData.source.id
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createBookmarkVideoPlaylist,
    handleClick () {
      this.createBookmarkVideoPlaylist(
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
