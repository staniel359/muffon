<template>
  <div
    class="ui input main-number-input"
    :class="{
      inverted: isDarkMode
    }"
  >
    <input
      type="number"
      min="0"
      step="5"
      :value="value"
      @blur="handleBlur"
    >
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseNumberInput',
  props: {
    value: Number
  },
  emits: [
    'blur'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  methods: {
    handleBlur (
      event
    ) {
      const value = parseInt(
        event.target.value
      )

      this.$emit(
        'blur',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
