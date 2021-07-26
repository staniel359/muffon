<template>
  <div class="login-section">
    {{ textFormatted }}

    <span
      class="main-link"
      @click="handleLoginLinkClick"
    >
      <strong>
        {{ linkFormatted }}
      </strong>
    </span>
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'LoginSection',
  emits: [
    'loginLinkClick'
  ],
  computed: {
    textFormatted () {
      return localize(
        'shared.profile.form.login.text'
      )
    },
    linkFormatted () {
      return localize(
        'shared.profile.form.login.link'
      )
    }
  },
  methods: {
    handleLoginLinkClick () {
      this.$emit('loginLinkClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.login-section
  @extend .text-align-center
</style>
