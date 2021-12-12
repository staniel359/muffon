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
        {{ rememberText }}
      </label>
    </div>
  </div>
</template>

<script>
import { setCheckbox } from '#/actions/plugins/semantic'

export default {
  name: 'BaseProfileRememberField',
  computed: {
    rememberText () {
      return this.$t(
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
