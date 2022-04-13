<template>
  <textarea
    ref="input"
    name="content"
    rows="4"
    :placeholder="contentText"
    :value="value"
    @keypress.ctrl.enter="handleCtrlEnter"
  />
</template>

<script>
export default {
  name: 'BaseContentField',
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
