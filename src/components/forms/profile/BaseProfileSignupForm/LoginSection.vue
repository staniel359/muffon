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
export default {
  name: 'LoginSection',
  emits: [
    'loginLinkClick'
  ],
  computed: {
    textFormatted () {
      return this.$t(
        'shared.profile.form.login.text'
      )
    },
    linkFormatted () {
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
