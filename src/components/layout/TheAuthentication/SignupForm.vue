<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <BaseSection />

    <ExtraSection
      @avatarChange="handleAvatarChange"
    />

    <RememberField />

    <SubmitButton />

    <BaseDivider />

    <LoginSection
      @loginLinkClick="handleLoginLinkClick"
    />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import BaseSection from './SignupForm/BaseSection.vue'
import ExtraSection from './SignupForm/ExtraSection.vue'
import RememberField from './SignupForm/RememberField.vue'
import SubmitButton from './SignupForm/SubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import LoginSection from './SignupForm/LoginSection.vue'
import { signupFormOptions } from '#/data/plugins/semantic'
import fetchSignupData from '#/actions/api/profile/signup/fetchData'

export default {
  name: 'SignupForm',
  components: {
    BaseFormContainer,
    BaseSection,
    ExtraSection,
    RememberField,
    SubmitButton,
    BaseDivider,
    LoginSection
  },
  emits: [
    'loginLinkClick'
  ],
  data () {
    return {
      avatar: null,
      error: null,
      form: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return signupFormOptions({
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

      this.fetchSignupData(
        this.formatProfileParams(
          fields
        )
      )
    },
    handleLoginLinkClick () {
      this.$emit('loginLinkClick')
    },
    handleAvatarChange (value) {
      this.avatar = value
    },
    fetchSignupData,
    formatProfileParams (fields) {
      return {
        email: fields.email,
        password: fields.password,
        passwordConfirmation:
          fields.passwordConfirmation,
        nickname: fields.nickname,
        avatar: this.avatar,
        gender: fields.gender,
        birthdate: this.formatDate(
          fields.birthdate
        ),
        country: fields.country,
        city: fields.city,
        isRemember: !!fields.remember
      }
    },
    formatDate (date) {
      if (date) {
        return date
          .toISOString()
          .substr(0, 10)
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
