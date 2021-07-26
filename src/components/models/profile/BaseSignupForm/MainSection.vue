<template>
  <BaseEmailField />
  <BasePasswordField />
  <BasePasswordConfirmationField />
  <BaseNicknameField />
</template>

<script>
import BaseEmailField from '@/models/profile/fields/BaseEmailField.vue'
import BasePasswordField from '@/models/profile/fields/BasePasswordField.vue'
import BasePasswordConfirmationField
  from '@/models/profile/fields/BasePasswordConfirmationField.vue'
import BaseNicknameField from '@/models/profile/fields/BaseNicknameField.vue'

export default {
  name: 'MainSection',
  components: {
    BaseEmailField,
    BasePasswordField,
    BasePasswordConfirmationField,
    BaseNicknameField
  }
}
</script>

<style lang="sass" scoped></style>
