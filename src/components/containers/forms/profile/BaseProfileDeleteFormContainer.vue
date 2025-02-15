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
import profileDeleteFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/profile/delete'
import deleteProfile from '@/helpers/actions/api/profile/delete'

export default {
  name: 'BaseProfileDeleteFormContainer',
  components: {
    BaseFormContainer
  },
  data () {
    return {
      error: null,
      isLoading: false,
      isSuccess: false,
      fields: [
        'password'
      ]
    }
  },
  computed: {
    options () {
      return profileDeleteFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteProfile,
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const deleteArgs =
        this.formatDeleteArgs(
          fields
        )

      this.deleteProfile(
        deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        window
          .mainProcess
          .sendCommand(
            'logout'
          )

        window
          .mainProcess
          .sendCommand(
            'account-delete'
          )
      }
    },
    formatDeleteArgs (
      fields
    ) {
      const {
        password
      } = fields

      return {
        password
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
