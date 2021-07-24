<template>
  <div class="field">
    <input
      type="text"
      name="nickname"
      :placeholder="placeholderFormatted"
      :value="value"
    >
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'NicknameField',
  props: {
    value: String
  },
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.fields.nickname'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
