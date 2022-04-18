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
  loginFormOptions
} from '*/helpers/data/plugins/semantic'
import createSession from '*/helpers/actions/api/session/create'
import getProfile from '*/helpers/actions/api/profile/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'BaseProfileLoginFormContainer',
  components: {
    BaseFormContainer
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
        'password'
      ]
    }
  },
  computed: {
    options () {
      return loginFormOptions(
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
    createSession,
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

      const sessionArgs =
        this.formatSessionArgs(
          fields
        )

      this.createSession(
        sessionArgs
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
          'profile.info': value
        }
      )
    },
    formatSessionArgs (
      fields
    ) {
      const {
        email,
        password,
        remember
      } = fields

      return {
        email,
        password,
        isRemember: !!remember
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
