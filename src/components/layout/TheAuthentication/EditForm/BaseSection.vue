<template>
  <EmailField :value="email" />
  <PasswordField />
  <PasswordConfirmationField />
  <NicknameField :value="nickname" />
</template>

<script>
import { mapState } from 'vuex'
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
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    email () {
      return this.profileInfo.email
    },
    nickname () {
      return this.profileInfo.nickname
    }
  }
}
</script>

<style lang="sass" scoped></style>
