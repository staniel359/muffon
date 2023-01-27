<template>
  <BaseWatchedOption
    action="add"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseWatchedOption
  from '@/components/dropdowns/options/watched/BaseWatchedOption.vue'
import createWatchedVideo from '@/helpers/actions/api/watched/video/create'

export default {
  name: 'AddOption',
  components: {
    BaseWatchedOption
  },
  inject: [
    'setWatchedId'
  ],
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      watchedId: null,
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
    createWatchedVideo,
    handleClick () {
      this.createWatchedVideo(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setWatchedId(
          this.watchedId
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
