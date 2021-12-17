<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot></slot>
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer from '@/containers/forms/BaseFormContainer.vue'
import { loginFormOptions } from '#/data/plugins/semantic'
import getLogin from '#/actions/api/login/get'
import { updateStore } from '#/actions'

export default {
  name: 'BaseProfileLoginFormContainer',
  components: {
    BaseFormContainer
  },
  data () {
    return {
      form: null,
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return loginFormOptions({
        onSuccess: this.handleSuccess
      })
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  methods: {
    handleInit (el) {
      this.form = el
    },
    handleSuccess (event, fields) {
      event.preventDefault()

      const loginArgs =
        this.formatLoginArgs(
          fields
        )

      this.getLogin(
        loginArgs
      )
    },
    handleProfileDataChange (value) {
      updateStore({
        'profile.isLoggedIn': !!value,
        'profile.info': value
      })
    },
    getLogin,
    formatLoginArgs (fields) {
      const {
        email,
        password,
        remember
      } = fields

      return {
        email,
        password,
        isRemember: !!remember
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
