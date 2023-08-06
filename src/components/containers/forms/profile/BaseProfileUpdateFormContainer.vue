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
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import notificationMixin from '@/mixins/notificationMixin'

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
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
      isSuccess: false,
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
          onSuccess: this.handleSuccess
        }
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.updated.profile'
      )
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  methods: {
    updateProfile,
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

        this.notifySuccess()
      }
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
