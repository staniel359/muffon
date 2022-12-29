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
import {
  profileUpdateFormOptions
} from '@/helpers/formatters/semantic'
import {
  stringToDate as formatStringToDate
} from '@/helpers/formatters'
import updateProfile from '@/helpers/actions/api/profile/update'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
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
        city
      } = fields

      const passwordConfirmation =
        fields[
          'password-confirmation'
        ]

      const image = this.image.data

      const birthdateFormatted =
        formatStringToDate(
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
        isPrivate: fields.private
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
