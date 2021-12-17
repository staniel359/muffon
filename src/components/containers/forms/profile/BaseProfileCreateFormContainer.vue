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
import createProfile from '#/actions/api/profile/create'
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

      const createArgs =
        this.formatCreateArgs(
          fields
        )

      this.createProfile(
        createArgs
      )
    },
    handleProfileDataChange (value) {
      updateStore({
        'profile.isLoggedIn': !!value,
        'profile.info': value
      })
    },
    createProfile,
    formatCreateArgs (fields) {
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

      const image = this.image.data

      const birthdateToDate = formatStringToDate(
        birthdate
      )

      const isRemember = !!fields.remember

      return {
        email,
        password,
        passwordConfirmation,
        nickname,
        image,
        gender,
        birthdate: birthdateToDate,
        country,
        city,
        isRemember
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
