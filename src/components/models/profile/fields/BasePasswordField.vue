<template>
  <div class="field">
    <input
      type="password"
      name="password"
      :placeholder="placeholderFormatted"
    >
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BasePasswordField',
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.fields.password'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
