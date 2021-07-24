<template>
  <EmailField />
  <PasswordField />
  <PasswordConfirmationField />
  <NicknameField />
</template>

<script>
import EmailField from '@/models/profile/fields/EmailField.vue'
import PasswordField from '@/models/profile/fields/PasswordField.vue'
import PasswordConfirmationField
  from '@/models/profile/fields/PasswordConfirmationField.vue'
import NicknameField from '@/models/profile/fields/NicknameField.vue'

export default {
  name: 'BaseSection',
  components: {
    EmailField,
    PasswordField,
    PasswordConfirmationField,
    NicknameField
  }
}
</script>

<style lang="sass" scoped></style>
