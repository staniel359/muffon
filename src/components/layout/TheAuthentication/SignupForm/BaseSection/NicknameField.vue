<template>
  <div class="field">
    <input
      type="text"
      name="nickname"
      :placeholder="placeholderFormatted"
    >
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'NicknameField',
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
