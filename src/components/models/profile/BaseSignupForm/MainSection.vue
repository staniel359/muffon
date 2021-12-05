<template>
  <BaseProfileEmailField />
  <BaseProfilePasswordField />
  <BaseProfilePasswordConfirmationField />
  <BaseProfileNicknameField />
</template>

<script>
import BaseProfileEmailField
  from '@/models/profile/fields/BaseProfileEmailField.vue'
import BaseProfilePasswordField
  from '@/models/profile/fields/BaseProfilePasswordField.vue'
import BaseProfilePasswordConfirmationField
  from '@/models/profile/fields/BaseProfilePasswordConfirmationField.vue'
import BaseProfileNicknameField
  from '@/models/profile/fields/BaseProfileNicknameField.vue'

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
