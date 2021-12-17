<template>
  <div class="field">
    <input
      ref="input"
      type="text"
      name="email"
      :placeholder="emailText"
      :value="value"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseProfileEmailField',
  props: {
    value: String
  },
  computed: {
    emailText () {
      return this.$t(
        'forms.fields.email'
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
