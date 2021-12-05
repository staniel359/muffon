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
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import { loginFormOptions } from '#/data/plugins/semantic'
import fetchLoginData from '#/actions/api/profile/login/fetchData'
import { updateStore } from '#/actions'

export default {
  name: 'BaseProfileLoginContainer',
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

      const loginDataArgs = this.formatLoginParams(
        fields
      )

      this.fetchLoginData(
        loginDataArgs
      )
    },
    handleProfileDataChange (value) {
      updateStore({
        'profile.isLoggedIn': !!value,
        'profile.info': value
      })
    },
    fetchLoginData,
    formatLoginParams (fields) {
      const { email, password, remember } = fields

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
