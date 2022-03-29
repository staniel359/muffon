<template>
  <BaseProfileEmailField
    :value="email"
  />

  <BaseProfilePasswordField />

  <BaseProfilePasswordConfirmationField />

  <BaseProfileNicknameField
    :value="nickname"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseProfileEmailField
  from '*/components/fields/profile/BaseProfileEmailField.vue'
import BaseProfilePasswordField
  from '*/components/fields/profile/BaseProfilePasswordField.vue'
import BaseProfilePasswordConfirmationField
  from '*/components/fields/profile/BaseProfilePasswordConfirmationField.vue'
import BaseProfileNicknameField
  from '*/components/fields/profile/BaseProfileNicknameField.vue'

export default {
  name: 'MainSection',
  components: {
    BaseProfileEmailField,
    BaseProfilePasswordField,
    BaseProfilePasswordConfirmationField,
    BaseProfileNicknameField
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
