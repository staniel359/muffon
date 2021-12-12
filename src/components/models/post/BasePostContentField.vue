<template>
  <textarea
    ref="input"
    name="content"
    rows="4"
    :placeholder="postText"
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
    postText () {
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
