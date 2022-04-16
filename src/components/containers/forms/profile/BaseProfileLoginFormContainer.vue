<template>
  <BaseFormContainer
    :options="options"
    :is-loading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import {
  loginFormOptions
} from '*/helpers/data/plugins/semantic'
import getLogin from '*/helpers/actions/api/login/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

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
      return loginFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  methods: {
    handleInit (
      element
    ) {
      this.form = element
    },
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const loginArgs =
        this.formatLoginArgs(
          fields
        )

      this.getLogin(
        loginArgs
      )
    },
    handleProfileDataChange (
      value
    ) {
      updateGlobalStore(
        {
          'profile.isLoggedIn': !!value,
          'profile.info': value
        }
      )
    },
    getLogin,
    formatLoginArgs (
      fields
    ) {
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
