<template>
  <BaseFormInputContainer>
    <input
      type="password"
      name="password-confirmation"
      :placeholder="passwordConfirmationText"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseProfilePasswordConfirmationField',
  components: {
    BaseFormInputContainer
  },
  computed: {
    passwordConfirmationText () {
      return this.$t(
        'forms.fields.passwordConfirmation'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
