<template>
  <FastLoginSection />

  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <EmailField />
    <PasswordField />

    <RememberField />

    <SubmitButton />

    <BaseDivider />

    <SignupSection
      @signupLinkClick="handleSignupLinkClick"
    />
  </BaseFormContainer>
</template>

<script>
import FastLoginSection from './LoginForm/FastLoginSection.vue'
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import EmailField from '@/models/profile/fields/EmailField.vue'
import PasswordField from '@/models/profile/fields/PasswordField.vue'
import RememberField from '@/models/profile/fields/RememberField.vue'
import SubmitButton from './LoginForm/SubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import SignupSection from './LoginForm/SignupSection.vue'
import { loginFormOptions } from '#/data/plugins/semantic'
import fetchLoginData from '#/actions/api/profile/login/fetchData'

export default {
  name: 'LoginForm',
  components: {
    FastLoginSection,
    BaseFormContainer,
    EmailField,
    PasswordField,
    RememberField,
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
