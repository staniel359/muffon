<template>
  <BaseProfileEmailField :value="email" />
  <BaseProfilePasswordField />
  <BaseProfilePasswordConfirmationField />
  <BaseProfileNicknameField :value="nickname" />
</template>

<script>
import { mapState } from 'vuex'
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
