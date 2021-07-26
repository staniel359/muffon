<template>
  <div class="field">
    <input
      type="password"
      name="passwordConfirmation"
      :placeholder="placeholderFormatted"
    >
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BasePasswordConfirmationField',
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.fields.passwordConfirmation'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
