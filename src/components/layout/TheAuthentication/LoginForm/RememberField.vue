<template>
  <div class="field">
    <div
      class="ui checkbox"
      ref="checkbox"
    >
      <input
        type="checkbox"
        name="remember"
      >
      <label>
        {{ placeholderFormatted }}
      </label>
    </div>
  </div>
</template>

<script>
import { setCheckbox } from '#/actions/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'RememberField',
  computed: {
    placeholderFormatted () {
      return localize(
        'shared.profile.form.remember'
      )
    }
  },
  mounted () {
    setCheckbox(
      this.$refs.checkbox
    )
  }
}
</script>

<style lang="sass" scoped></style>
