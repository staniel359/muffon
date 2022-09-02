<template>
  <BaseFormContainer
    :options="options"
    :is-loading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import {
  profileCreateFormOptions
} from '*/helpers/data/plugins/semantic'
import {
  stringToDate as formatStringToDate
} from '*/helpers/formatters'
import createProfile from '*/helpers/actions/api/profile/create'
import getProfile from '*/helpers/actions/api/profile/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

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
      'profile',
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
