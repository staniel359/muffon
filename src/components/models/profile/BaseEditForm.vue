<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    :class="{ success: isSuccess }"
    @init="handleInit"
  >
    <SuccessMessage />

    <MainSection />

    <BaseDivider />

    <ExtraSection
      @imageChange="handleImageChange"
    />

    <SubmitButton />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import SuccessMessage from './BaseEditForm/SuccessMessage.vue'
import MainSection from './BaseEditForm/MainSection.vue'
import BaseDivider from '@/BaseDivider.vue'
import ExtraSection from './BaseEditForm/ExtraSection.vue'
import SubmitButton from './BaseEditForm/SubmitButton.vue'
import { profileEditFormOptions } from '#/data/plugins/semantic'
import fetchEditData from '#/actions/api/profile/edit/fetchData'
import { stringToDate as formatStringToDate } from '#/formatters'

export default {
  name: 'BaseEditForm',
  components: {
    BaseFormContainer,
    SuccessMessage,
    MainSection,
    BaseDivider,
    ExtraSection,
    SubmitButton
  },
  data () {
    return {
      image: null,
      error: null,
      form: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    options () {
      return profileEditFormOptions({
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
    handleImageChange (value) {
      this.image = value
    },
    fetchEditData,
    formatProfileParams (fields) {
      return {
        email: fields.email,
        password: fields.password,
        passwordConfirmation:
          fields.passwordConfirmation,
        nickname: fields.nickname,
        image: this.image,
        gender: fields.gender,
        birthdate: formatStringToDate(
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
