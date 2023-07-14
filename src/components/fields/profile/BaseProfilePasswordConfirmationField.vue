<template>
  <BaseInputContainer
    class="fluid field"
  >
    <input
      type="password"
      name="password-confirmation"
      :placeholder="passwordConfirmationText"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseProfilePasswordConfirmationField',
  components: {
    BaseInputContainer
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
