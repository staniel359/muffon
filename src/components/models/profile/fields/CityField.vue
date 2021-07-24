<template>
  <div class="field">
    <input
      type="text"
      name="city"
      :placeholder="placeholderFormatted"
      :value="value"
    >
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'CityField',
  props: {
    value: String
  },
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
