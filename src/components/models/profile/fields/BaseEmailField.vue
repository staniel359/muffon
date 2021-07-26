<template>
  <div class="field">
    <input
      type="text"
      name="email"
      autofocus
      :placeholder="placeholderFormatted"
      :value="value"
    >
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseEmailField',
  props: {
    value: String
  },
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.fields.email'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
