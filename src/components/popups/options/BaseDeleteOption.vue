<template>
  <BaseOption
    icon="delete"
    :text="deleteText"
    is-icon-red
    @click="handleClick"
  />
</template>

<script>
import BaseOption from './BaseOption.vue'

export default {
  name: 'BaseDeleteOption',
  components: {
    BaseOption
  },
  inject: [
    'hidePopup'
  ],
  emits: [
    'click'
  ],
  computed: {
    deleteText () {
      return this.$t(
        'actions.delete'
      )
    }
  },
  methods: {
    handleClick () {
      this.hidePopup()

      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
