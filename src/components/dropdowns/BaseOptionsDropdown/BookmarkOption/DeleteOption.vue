<template>
  <BaseBookmarkOption
    action="delete"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption from '../options/BaseBookmarkOption.vue'
import deleteBookmark from '*/helpers/actions/api/bookmark/model/delete'

export default {
  name: 'DeleteOption',
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
    modelId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    deleteArgs () {
      return {
        model: this.model,
        bookmarkId: this.modelId
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
