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
import profileLoginFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/profile/login'
import createSession from '@/helpers/actions/api/session/create'
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
      error: null,
      isLoading: false,
      fields: [
        'email',
        'password'
      ]
    }
  },
  computed: {
    options () {
      return profileLoginFormOptions(
        {
          onSuccess:
            this.handleSubmitSuccess
        }
      )
    }
  },
  methods: {
    createSession,
    handleSubmitSuccess (
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
      ).then(
        this.handleSessionCreateSuccess
      )
    },
    async handleSessionCreateSuccess (
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
