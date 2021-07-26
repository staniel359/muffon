<template>
  <BaseEmailField :value="email" />
  <BasePasswordField />
  <BasePasswordConfirmationField />
  <BaseNicknameField :value="nickname" />
</template>

<script>
import { mapState } from 'vuex'
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
