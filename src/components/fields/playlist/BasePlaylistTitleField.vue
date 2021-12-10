<template>
  <div class="field">
    <input
      ref="input"
      type="text"
      name="title"
      :placeholder="placeholderFormatted"
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
    placeholderFormatted () {
      return this.$t(
        'shared.playlist.form.fields.title'
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
