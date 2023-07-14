<template>
  <BaseInputContainer
    :class="{
      icon
    }"
    :icon="icon"
  >
    <input
      ref="input"
      class="prompt"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      @keypress.enter="handleEnterPress"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseInput',
  components: {
    BaseInputContainer
  },
  props: {
    modelValue: String,
    icon: String,
    placeholder: String
  },
  emits: [
    'update:modelValue',
    'enterPress'
  ],
  methods: {
    handleInput (
      event
    ) {
      const {
        value
      } = event.target

      this.$emit(
        'update:modelValue',
        value
      )
    },
    handleEnterPress () {
      this.$emit(
        'enterPress'
      )
    },
    focus () {
      this.$refs
        .input
        .focus()
    },
    unfocus () {
      this.$refs
        .input
        .blur()
    }
  }
}
</script>

<style lang="sass" scoped></style>
