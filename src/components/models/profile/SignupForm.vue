<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <BaseSection />

    <BaseAccordionContainer :title="extraTextFormatted">
      <ExtraSection
        @avatarChange="handleAvatarChange"
      />
    </BaseAccordionContainer>

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
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import ExtraSection from './SignupForm/ExtraSection.vue'
import RememberField from '@/models/profile/fields/RememberField.vue'
import SubmitButton from './SignupForm/SubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import LoginSection from './SignupForm/LoginSection.vue'
import { signupFormOptions } from '#/data/plugins/semantic'
import fetchSignupData from '#/actions/api/profile/signup/fetchData'
import { localize } from '#/actions/plugins/i18n'
import { date as formatDate } from '#/formatters'

export default {
  name: 'SignupForm',
  components: {
    BaseFormContainer,
    BaseSection,
    BaseAccordionContainer,
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
    },
    extraTextFormatted () {
      return localize(
        'shared.profile.form.sections.extra'
      )
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
        birthdate: formatDate(
          fields.birthdate
        ),
        country: fields.country,
        city: fields.city,
        isRemember: !!fields.remember
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
