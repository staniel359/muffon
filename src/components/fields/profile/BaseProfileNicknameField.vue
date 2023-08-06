<template>
  <BaseFormInputContainer>
    <input
      type="text"
      name="nickname"
      :placeholder="nicknameText"
      :value="value"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseProfileNicknameField',
  components: {
    BaseFormInputContainer
  },
  props: {
    value: String
  },
  computed: {
    nicknameText () {
      return this.$t(
        'forms.fields.nickname'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
