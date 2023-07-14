<template>
  <BaseInputContainer
    class="fluid field"
  >
    <input
      type="text"
      name="nickname"
      :placeholder="nicknameText"
      :value="value"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseProfileNicknameField',
  components: {
    BaseInputContainer
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
