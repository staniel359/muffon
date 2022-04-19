<template>
  <BaseListenedOption
    action="delete"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseListenedOption from '../options/BaseListenedOption.vue'
import deleteListened from '*/helpers/actions/api/listened/model/delete'

export default {
  name: 'DeleteOption',
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
        listenedId: this.modelId
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
