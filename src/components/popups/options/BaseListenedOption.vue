<template>
  <BaseOption
    icon="listened"
    :text="actionText"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseOption from './BaseOption.vue'

export default {
  name: 'BaseListenedOption',
  components: {
    BaseOption
  },
  props: {
    action: {
      type: String,
      required: true
    },
    isLoading: Boolean,
    isError: Boolean
  },
  emits: [
    'click'
  ],
  data () {
    return {
      actionTextKeys: {
        add: 'addTo',
        delete: 'deleteFrom'
      }
    }
  },
  computed: {
    actionText () {
      return this.$t(
        `actions.${this.actionTextKey}.listened`
      )
    },
    actionTextKey () {
      return this.actionTextKeys[
        this.action
      ]
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
