<template>
  <BaseInputContainer>
    <input
      type="number"
      :value="value"
      :min="min"
      :step="step"
      :max="max"
      @blur="handleBlur"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseNumberInput',
  components: {
    BaseInputContainer
  },
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
    'change'
  ],
  methods: {
    handleBlur (
      event
    ) {
      const value =
        parseInt(
          event.target.value
        ) || 0

      this.$emit(
        'change',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
