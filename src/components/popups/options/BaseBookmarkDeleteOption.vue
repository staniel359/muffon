<template>
  <BaseBookmarkOption
    action="delete"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption from './BaseBookmarkOption.vue'
import deleteBookmark from '@/helpers/actions/api/bookmark/model/delete'

export default {
  name: 'BaseBookmarkDeleteOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    model: {
      type: String,
      required: true
    },
    bookmarkId: {
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
        model: this.model,
        bookmarkId: this.bookmarkId
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteBookmark,
    handleClick () {
      this.deleteBookmark(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setBookmarkId(
          null
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
