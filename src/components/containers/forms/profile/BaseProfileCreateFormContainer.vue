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
      error: null,
      token: null,
      profileId: null,
      profileData: null,
      isRemember: false,
      isLoading: false,
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
    async handleProfileIdChange (
      value
    ) {
      if (value) {
        await this.setSessionData()

        this.fetchData()
      }
    },
    handleProfileDataChange (
      value
    ) {
      updateGlobalStore(
        {
          'profile/store.isLoggedIn': !!value,
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
    },
    setSessionData () {
      updateGlobalStore(
        {
          'profile.token': this.token,
          'profile.isRemember': this.isRemember
        }
      )
    },
    fetchData () {
      this.getProfile(
        this.profileArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
