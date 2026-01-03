<template>
  <BaseFormInputContainer
    class="ui icon input width-100"
  >
    <BaseIcon
      :icon="passwordToggleIcon"
      is-clickable
      @click="handlePasswordToggleIconClick"
    />

    <input
      :type="fieldType"
      name="password-confirmation"
      :placeholder="passwordConfirmationText"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

import passwordFieldMixin from '@/mixins/passwordFieldMixin'

export default {
  name: 'BaseProfilePasswordConfirmationField',
  components: {
    BaseFormInputContainer
  },
  mixins: [
    passwordFieldMixin
  ],
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
