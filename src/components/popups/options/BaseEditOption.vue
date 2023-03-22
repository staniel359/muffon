<template>
  <BaseOption
    icon="edit"
    :text="editText"
    @click="handleClick"
  />
</template>

<script>
import BaseOption from './BaseOption.vue'

export default {
  name: 'BaseEditOption',
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
    editText () {
      return this.$t(
        'actions.edit'
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
