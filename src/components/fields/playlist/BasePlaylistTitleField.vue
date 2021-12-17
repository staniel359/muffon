<template>
  <div class="field">
    <input
      ref="input"
      type="text"
      name="title"
      :placeholder="titleText"
      :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'BasePlaylistTitleField',
  props: {
    value: String
  },
  computed: {
    titleText () {
      return this.$t(
        'forms.fields.title'
      )
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
