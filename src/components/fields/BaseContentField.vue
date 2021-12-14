<template>
  <textarea
    ref="input"
    name="content"
    rows="4"
    :placeholder="contentText"
    :value="value"
  ></textarea>
</template>

<script>
export default {
  name: 'BaseContentField',
  props: {
    value: String
  },
  computed: {
    contentText () {
      return this.$t(
        'inputs.content'
      )
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    reset () {
      this.$refs.input.value = ''
    }
  }
}
</script>

<style lang="sass" scoped></style>
