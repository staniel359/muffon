<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <MainSection />

    <BaseAccordionContainer :title="extraTextFormatted">
      <ExtraSection
        @avatarChange="handleAvatarChange"
      />
    </BaseAccordionContainer>

    <BaseRememberField />

    <SubmitButton />

    <BaseDivider />

    <LoginSection
      @loginLinkClick="handleLoginLinkClick"
    />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import MainSection from './BaseSignupForm/MainSection.vue'
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import ExtraSection from './BaseSignupForm/ExtraSection.vue'
import BaseRememberField from '@/models/profile/fields/BaseRememberField.vue'
import SubmitButton from './BaseSignupForm/SubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import LoginSection from './BaseSignupForm/LoginSection.vue'
import { signupFormOptions } from '#/data/plugins/semantic'
import fetchSignupData from '#/actions/api/profile/signup/fetchData'
import { localize } from '#/actions/plugins/i18n'
import { date as formatDate } from '#/formatters'
import { setGlobalData } from '#/actions'

export default {
  name: 'BaseSignupForm',
  components: {
    BaseFormContainer,
    MainSection,
    BaseAccordionContainer,
    ExtraSection,
    BaseRememberField,
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
      profileData: null,
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
  watch: {
    profileData: 'handleProfileDataChange'
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
    handleProfileDataChange (value) {
      setGlobalData({
        'profile.isLoggedIn': !!value,
        'profile.info': value
      })
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
