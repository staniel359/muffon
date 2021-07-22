<template>
  <div class="field">
    <input
      type="text"
      name="email"
      autofocus
      :placeholder="placeholderFormatted"
    >
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'EmailField',
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
