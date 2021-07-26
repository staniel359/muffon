<template>
  <FastLoginSection />

  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <BaseEmailField />
    <BasePasswordField />

    <BaseRememberField />

    <SubmitButton />

    <BaseDivider />

    <SignupSection
      @signupLinkClick="handleSignupLinkClick"
    />
  </BaseFormContainer>
</template>

<script>
import FastLoginSection from './BaseLoginForm/FastLoginSection.vue'
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import BaseEmailField from '@/models/profile/fields/BaseEmailField.vue'
import BasePasswordField from '@/models/profile/fields/BasePasswordField.vue'
import BaseRememberField from '@/models/profile/fields/BaseRememberField.vue'
import SubmitButton from './BaseLoginForm/SubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import SignupSection from './BaseLoginForm/SignupSection.vue'
import { loginFormOptions } from '#/data/plugins/semantic'
import fetchLoginData from '#/actions/api/profile/login/fetchData'
import { setGlobalData } from '#/actions'

export default {
  name: 'BaseLoginForm',
  components: {
    FastLoginSection,
    BaseFormContainer,
    BaseEmailField,
    BasePasswordField,
    BaseRememberField,
    SubmitButton,
    SignupSection,
    BaseDivider
  },
  emits: [
    'signupLinkClick'
  ],
  data () {
    return {
      error: null,
      form: null,
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

      this.fetchLoginData(
        this.formatProfileParams(
          fields
        )
      )
    },
    handleSignupLinkClick () {
      this.$emit('signupLinkClick')
    },
    handleProfileDataChange (value) {
      setGlobalData({
        'profile.isLoggedIn': !!value,
        'profile.info': value
      })
    },
    fetchLoginData,
    formatProfileParams (fields) {
      return {
        email: fields.email,
        password: fields.password,
        isRemember: !!fields.remember
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
