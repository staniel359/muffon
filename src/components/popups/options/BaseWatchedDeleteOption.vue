<template>
  <BaseWatchedOption
    action="delete"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseWatchedOption from './BaseWatchedOption.vue'
import deleteWatchedVideo from '@/helpers/actions/api/watched/video/delete'

export default {
  name: 'BaseWatchedDeleteOption',
  components: {
    BaseWatchedOption
  },
  inject: [
    'setWatchedId'
  ],
  props: {
    watchedId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      isError: false,
      isSuccess: false
    }
  },
  computed: {
    deleteArgs () {
      return {
        watchedId: this.watchedId
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteWatchedVideo,
    handleClick () {
      this.deleteWatchedVideo(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setWatchedId(
          null
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
