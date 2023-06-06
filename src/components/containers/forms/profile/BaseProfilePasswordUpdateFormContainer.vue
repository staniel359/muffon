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
  update as passwordUpdateFormOptions
} from '@/helpers/formatters/plugins/semantic/options/form/password'
import updatePassword from '@/helpers/actions/api/password/update'

export default {
  name: 'BaseProfilePasswordUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  inject: [
    'setIsSuccess'
  ],
  props: {
    email: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      isLoading: false,
      isSuccess: false,
      fields: [
        'password-reset-code',
        'password',
        'password-confirmation'
      ]
    }
  },
  computed: {
    options () {
      return passwordUpdateFormOptions(
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
    updatePassword,
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const passwordUpdateArgs =
        this.formatPasswordUpdateArgs(
          fields
        )

      this.updatePassword(
        passwordUpdateArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      this.setIsSuccess(
        value
      )
    },
    formatPasswordUpdateArgs (
      fields
    ) {
      const {
        password
      } = fields

      const passwordConfirmation =
        fields[
          'password-confirmation'
        ]

      const code = fields[
        'password-reset-code'
      ]

      return {
        email: this.email,
        code,
        password,
        passwordConfirmation
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
