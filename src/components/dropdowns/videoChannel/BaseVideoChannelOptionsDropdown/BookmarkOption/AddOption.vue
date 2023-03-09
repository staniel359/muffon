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
  from '@/components/dropdowns/options/bookmark/BaseBookmarkOption.vue'
import createBookmarkVideoChannel
  from '@/helpers/actions/api/bookmark/videoChannel/create'

export default {
  name: 'AddOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    channelData: {
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
        channelId: this.channelId
      }
    },
    channelId () {
      return this.channelData.source.id
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createBookmarkVideoChannel,
    handleClick () {
      this.createBookmarkVideoChannel(
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
