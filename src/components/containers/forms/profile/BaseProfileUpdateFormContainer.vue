<template>
  <BaseFormContainer
    ref="form"
    :options="options"
    :is-loading="isLoading"
    :error="error"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '@/components/containers/forms/BaseFormContainer.vue'
import profileUpdateFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/profile/update'
import {
  birthdate as formatBirthdate
} from '@/helpers/formatters/dateTimeString'
import updateProfile from '@/helpers/actions/api/profile/update'
import notificationMixin from '@/mixins/notificationMixin'
import {
  set as setProfileInfo
} from '@/helpers/actions/profile/info'

export default {
  name: 'BaseProfileUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  mixins: [
    notificationMixin
  ],
  props: {
    image: Object
  },
  emits: [
    'success'
  ],
  data () {
    return {
      error: null,
      isLoading: false,
      fields: [
        'email',
        'password',
        'password-confirmation',
        'nickname'
      ]
    }
  },
  computed: {
    options () {
      return profileUpdateFormOptions(
        {
          onSuccess:
            this.handleSubmitSuccess
        }
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.updated.profile'
      )
    }
  },
  methods: {
    updateProfile,
    handleSubmitSuccess (
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
      ).then(
        this.handleProfileUpdateSuccess
      )
    },
    async handleProfileUpdateSuccess (
      responseData
    ) {
      await setProfileInfo(
        responseData.profile
      )

      this.notifySuccess()

      this.$emit(
        'success'
      )
    },
    formatUpdateArgs (
      fields
    ) {
      const {
        email,
        password,
        nickname,
        gender,
        birthdate,
        country,
        city,
        status
      } = fields

      const passwordConfirmation =
        fields[
          'password-confirmation'
        ]

      const image = this.image.data

      const birthdateFormatted =
        formatBirthdate(
          birthdate
        )

      return {
        email,
        password,
        passwordConfirmation,
        nickname,
        image,
        gender,
        birthdate:
          birthdateFormatted,
        country,
        city,
        status,
        isPrivate: fields.private
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
