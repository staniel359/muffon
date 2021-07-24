<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    :class="{ success: isSuccess }"
    @init="handleInit"
  >
    <SuccessMessage />

    <BaseSection />

    <BaseDivider />

    <ExtraSection
      @avatarChange="handleAvatarChange"
    />

    <SubmitButton />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import SuccessMessage from './EditForm/SuccessMessage.vue'
import BaseSection from './EditForm/BaseSection.vue'
import BaseDivider from '@/BaseDivider.vue'
import ExtraSection from './EditForm/ExtraSection.vue'
import SubmitButton from './EditForm/SubmitButton.vue'
import { editFormOptions } from '#/data/plugins/semantic'
import fetchEditData from '#/actions/api/profile/edit/fetchData'
import { date as formatDate } from '#/formatters'

export default {
  name: 'EditForm',
  components: {
    BaseFormContainer,
    SuccessMessage,
    BaseSection,
    BaseDivider,
    ExtraSection,
    SubmitButton
  },
  data () {
    return {
      avatar: null,
      error: null,
      form: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    options () {
      return editFormOptions({
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

      this.fetchEditData(
        this.formatProfileParams(
          fields
        )
      )
    },
    handleAvatarChange (value) {
      this.avatar = value
    },
    fetchEditData,
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
        city: fields.city
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
