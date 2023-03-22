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
import createBookmarkVideo from '@/helpers/actions/api/bookmark/video/create'

export default {
  name: 'AddOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    videoData: {
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
        videoId: this.videoId
      }
    },
    videoId () {
      return this.videoData.source.id
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createBookmarkVideo,
    handleClick () {
      this.createBookmarkVideo(
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
