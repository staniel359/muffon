<template>
  <BaseListenedOption
    action="delete"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseListenedOption from './BaseListenedOption.vue'
import deleteListened from '@/helpers/actions/api/listened/model/delete'

export default {
  name: 'BaseListenedDeleteOption',
  components: {
    BaseListenedOption
  },
  inject: [
    'setListenedId'
  ],
  props: {
    model: {
      type: String,
      required: true
    },
    listenedId: {
      type: Number,
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
        listenedId: this.listenedId
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteListened,
    handleClick () {
      this.deleteListened(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setListenedId(
          null
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
