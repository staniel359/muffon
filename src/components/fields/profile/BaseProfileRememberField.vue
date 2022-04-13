<template>
  <div class="field remember-field">
    <div
      ref="checkbox"
      class="ui checkbox"
    >
      <input
        type="checkbox"
        name="remember"
      >

      <label
        v-text="rememberText"
      />
    </div>
  </div>
</template>

<script>
import {
  setCheckbox
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseProfileRememberField',
  computed: {
    rememberText () {
      return this.$t(
        'forms.fields.remember'
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
