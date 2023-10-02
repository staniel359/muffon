<template>
  <div>
    <BaseProfileEmailField
      ref="email"
    />

    <BaseProfilePasswordField />

    <BaseProfilePasswordConfirmationField />

    <BaseProfileNicknameField />
  </div>
</template>

<script>
import BaseProfileEmailField
  from '@/components/fields/profile/BaseProfileEmailField.vue'
import BaseProfilePasswordField
  from '@/components/fields/profile/BaseProfilePasswordField.vue'
import BaseProfilePasswordConfirmationField
  from '@/components/fields/profile/BaseProfilePasswordConfirmationField.vue'
import BaseProfileNicknameField
  from '@/components/fields/profile/BaseProfileNicknameField.vue'

export default {
  name: 'MainSection',
  components: {
    BaseProfileEmailField,
    BaseProfilePasswordField,
    BaseProfilePasswordConfirmationField,
    BaseProfileNicknameField
  },
  mounted () {
    this.focusEmail()
  },
  methods: {
    focusEmail () {
      this.$refs
        .email
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
