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
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseFormContainer
  from '@/components/containers/forms/BaseFormContainer.vue'
import profileCreateFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/profile/create'
import {
  birthdate as formatBirthdate
} from '@/helpers/formatters/dateTimeString'
import createProfile from '@/helpers/actions/api/profile/create'
import getProfile from '@/helpers/actions/api/profile/get'
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
      token: null,
      profileId: null,
      profileData: null,
      error: null,
      isLoading: false,
      isRemember: false,
      fields: [
        'email',
        'password',
        'password-confirmation',
        'nickname'
      ]
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileToken: 'token'
      }
    ),
    options () {
      return profileCreateFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    },
    profileArgs () {
      return {
        profileId: this.profileId
      }
    }
  },
  watch: {
    profileId: 'handleProfileIdChange',
    profileToken: 'handleProfileTokenChange',
    profileData: 'handleProfileDataChange'
  },
  methods: {
    createProfile,
    getProfile,
    handleSuccess (
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
      )
    },
    handleProfileIdChange (
      value
    ) {
      if (value) {
        this.setSessionData()
      }
    },
    handleProfileTokenChange (
      value
    ) {
      if (value) {
        this.getProfile(
          this.profileArgs
        )
      }
    },
    handleProfileDataChange (
      value
    ) {
      updateGlobalStore(
        {
          'profile.info': value
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
    setSessionData () {
      updateGlobalStore(
        {
          'profile.token': this.token,
          'profile.isRemember': this.isRemember
        }
      )
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
