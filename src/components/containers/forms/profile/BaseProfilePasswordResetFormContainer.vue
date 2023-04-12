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
  passwordResetFormOptions
} from '@/helpers/formatters/plugins/semantic'
import resetPassword from '@/helpers/actions/api/password/reset'

export default {
  name: 'BaseProfilePasswordResetFormContainer',
  components: {
    BaseFormContainer
  },
  inject: [
    'setEmail'
  ],
  data () {
    return {
      error: null,
      isLoading: false,
      fields: [
        'email'
      ]
    }
  },
  computed: {
    options () {
      return passwordResetFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    }
  },
  methods: {
    resetPassword,
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const passwordResetArgs =
        this.formatPasswordResetArgs(
          fields
        )

      this.resetPassword(
        passwordResetArgs
      )
    },
    formatPasswordResetArgs (
      fields
    ) {
      const {
        email
      } = fields

      return {
        email
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
