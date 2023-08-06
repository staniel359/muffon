<template>
  <BaseFormInputContainer>
    <textarea
      ref="input"
      name="content"
      rows="4"
      :placeholder="contentText"
      :value="value"
      @keypress.ctrl.enter="handleCtrlEnter"
    />
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseContentField',
  components: {
    BaseFormInputContainer
  },
  props: {
    value: String
  },
  emits: [
    'submit'
  ],
  computed: {
    contentText () {
      return this.$t(
        'inputs.content'
      )
    }
  },
  methods: {
    handleCtrlEnter () {
      this.$emit(
        'submit'
      )
    },
    focus () {
      this.$refs
        .input
        .focus()
    },
    reset () {
      this.$refs
        .input
        .value = ''
    },
    updateValue (
      value
    ) {
      this.$refs
        .input
        .value += value
    }
  }
}
</script>

<style lang="sass" scoped></style>
