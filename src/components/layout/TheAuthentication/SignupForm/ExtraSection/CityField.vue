<template>
  <div class="field">
    <input
      type="text"
      name="city"
      :placeholder="placeholderFormatted"
    >
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'CityField',
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.fields.city'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
