<template>
  <BaseProfileEmailField />
  <BaseProfilePasswordField />
  <BaseProfilePasswordConfirmationField />
  <BaseProfileNicknameField />
</template>

<script>
import BaseProfileEmailField
  from '@/fields/profile/BaseProfileEmailField.vue'
import BaseProfilePasswordField
  from '@/fields/profile/BaseProfilePasswordField.vue'
import BaseProfilePasswordConfirmationField
  from '@/fields/profile/BaseProfilePasswordConfirmationField.vue'
import BaseProfileNicknameField
  from '@/fields/profile/BaseProfileNicknameField.vue'

export default {
  name: 'MainSection',
  components: {
    BaseProfileEmailField,
    BaseProfilePasswordField,
    BaseProfilePasswordConfirmationField,
    BaseProfileNicknameField
  }
}
</script>

<style lang="sass" scoped></style>
