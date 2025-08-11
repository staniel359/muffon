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
import profileCreateFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/profile/create'
import {
  birthdate as formatBirthdate
} from '@/helpers/formatters/dateTimeString'
import createProfile from '@/helpers/actions/api/profile/create'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

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
      return profileCreateFormOptions(
        {
          onSuccess:
            this.handleSubmitSuccess
        }
      )
    }
  },
  methods: {
    createProfile,
    handleSubmitSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const createArgs =
        this.formatCreateArgs(
          fields
        )

      this.createProfile(
        createArgs
      ).then(
        this.handleProfileCreateSuccess
      )
    },
    async handleProfileCreateSuccess (
      responseData
    ) {
      const profileId =
        responseData.profile.id

      const profileToken =
        responseData.profile.token

      const isRememberProfile =
        responseData.isRemember

      updateGlobalStore(
        {
          'profile.id': profileId,
          'profile.token': profileToken,
          'profile.isRemember': isRememberProfile
        }
      )
    },
    formatCreateArgs (
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

      const isRemember = !!fields.remember

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
        isPrivate:
          fields.private,
        isRemember
      }
    },
    validateField (
      value
    ) {
      this.$refs
        .form
        .validateField(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
