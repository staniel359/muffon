<template>
  <EmailField />
  <PasswordField />
  <PasswordConfirmationField />
  <NicknameField />
</template>

<script>
import EmailField from './BaseSection/EmailField.vue'
import PasswordField from './BaseSection/PasswordField.vue'
import PasswordConfirmationField
  from './BaseSection/PasswordConfirmationField.vue'
import NicknameField from './BaseSection/NicknameField.vue'

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
