<template>
  <div class="login-section">
    {{ loginText }}

    <span
      class="main-link"
      @click="handleLoginLinkClick"
    >
      <strong>
        {{ linkText }}
      </strong>
    </span>
  </div>
</template>

<script>
export default {
  name: 'LoginSection',
  emits: [
    'loginLinkClick'
  ],
  computed: {
    loginText () {
      return this.$t(
        'shared.profile.form.login.text'
      )
    },
    linkText () {
      return this.$t(
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
