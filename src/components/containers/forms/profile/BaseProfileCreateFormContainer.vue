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
import BaseFormContainer from '@/containers/forms/BaseFormContainer.vue'
import { profileCreateFormOptions } from '#/data/plugins/semantic'
import { stringToDate as formatStringToDate } from '#/formatters'
import fetchCreateData from '#/actions/api/profile/create/fetchData'
import { updateStore } from '#/actions'

export default {
  name: 'BaseProfileCreateFormContainer',
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
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return profileCreateFormOptions({
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

      const createDataArgs = this.formatProfileParams(
        fields
      )

      this.fetchCreateData(
        createDataArgs
      )
    },
    handleProfileDataChange (value) {
      updateStore({
        'profile.isLoggedIn': !!value,
        'profile.info': value
      })
    },
    fetchCreateData,
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

      const isRemember = !!fields.remember

      return {
        email,
        password,
        passwordConfirmation,
        nickname,
        image: imageFormatted,
        gender,
        birthdate: birthdateFormatted,
        country,
        city,
        isRemember
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
