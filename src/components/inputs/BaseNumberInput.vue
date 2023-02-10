<template>
  <div
    class="ui input"
    :class="{
      inverted: isDarkMode
    }"
  >
    <input
      type="number"
      :value="value"
      :min="min"
      :step="step"
      :max="max"
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
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    value: Number,
    max: Number
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
      const value =
        parseInt(
          event.target.value
        ) || null

      this.$emit(
        'blur',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
