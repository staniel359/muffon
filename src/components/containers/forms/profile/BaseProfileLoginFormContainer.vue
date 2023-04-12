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
import {
  loginFormOptions
} from '@/helpers/formatters/plugins/semantic'
import createSession from '@/helpers/actions/api/session/create'
import getProfile from '@/helpers/actions/api/profile/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'BaseProfileLoginFormContainer',
  components: {
    BaseFormContainer
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
        'password'
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
    profileToken: 'handleProfileTokenChange',
    profileData: 'handleProfileDataChange'
  },
  methods: {
    createSession,
    getProfile,
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
