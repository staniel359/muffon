<template>
  <BaseFormContainer
    :options="options"
    :is-loading="isLoading"
    :error="error"
    :class="{
      success: isSuccess
    }"
    @init="handleInit"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import {
  profileUpdateFormOptions
} from '*/helpers/data/plugins/semantic'
import {
  stringToDate as formatStringToDate
} from '*/helpers/formatters'
import updateProfile from '*/helpers/actions/api/profile/update'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'BaseProfileUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    image: Object
  },
  data () {
    return {
      form: null,
      profileData: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      fields: [
        'email',
        'password',
        'password_confirmation',
        'nickname'
      ]
    }
  },
  computed: {
    options () {
      return profileUpdateFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  methods: {
    updateProfile,
    handleInit (
      element
    ) {
      this.form = element
    },
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const updateArgs =
        this.formatUpdateArgs(
          fields
        )

      this.updateProfile(
        updateArgs
      )
    },
    handleProfileDataChange (
      value
    ) {
      if (value) {
        updateGlobalStore(
          {
            'profile.info': value
          }
        )
      }
    },
    formatUpdateArgs (
      fields
    ) {
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

      const birthdateToDate =
        formatStringToDate(
          birthdate
        )

      return {
        email,
        password,
        passwordConfirmation,
        nickname,
        image: image,
        gender,
        birthdate: birthdateToDate,
        country,
        city
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
