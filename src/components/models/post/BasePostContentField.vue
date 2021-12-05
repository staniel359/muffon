<template>
  <textarea
    ref="input"
    name="content"
    rows="4"
    :placeholder="textFormatted"
    :value="value"
  ></textarea>
</template>

<script>
export default {
  name: 'BasePostContentField',
  props: {
    value: String
  },
  computed: {
    textFormatted () {
      return this.$t(
        'inputs.post'
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
