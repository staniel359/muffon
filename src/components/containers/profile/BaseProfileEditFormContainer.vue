<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    :class="{ success: isSuccess }"
    @init="handleInit"
  >
    <slot></slot>
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer from '@/containers/BaseFormContainer.vue'
import { profileEditFormOptions } from '#/data/plugins/semantic'
import { stringToDate as formatStringToDate } from '#/formatters'
import fetchEditData from '#/actions/api/profile/edit/fetchData'

export default {
  name: 'BaseProfileEditFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    image: Object
  },
  data () {
    return {
      form: null,
      error: null,
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

      const editDataArgs = this.formatProfileParams(
        fields
      )

      this.fetchEditData(
        editDataArgs
      )
    },
    fetchEditData,
    formatProfileParams (fields) {
      const {
        email,
        password,
        passwordConfirmation,
        nickname,
        gender,
        birthdate,
        country,
        city
      } = fields

      const imageFormatted = this.image.data

      const birthdateFormatted = formatStringToDate(
        birthdate
      )

      return {
        email,
        password,
        passwordConfirmation,
        nickname,
        image: imageFormatted,
        gender,
        birthdate: birthdateFormatted,
        country,
        city
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
