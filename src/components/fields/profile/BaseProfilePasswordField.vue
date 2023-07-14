<template>
  <BaseInputContainer
    class="fluid field"
  >
    <input
      ref="input"
      type="password"
      name="password"
      :placeholder="passwordText"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseProfilePasswordField',
  components: {
    BaseInputContainer
  },
  computed: {
    passwordText () {
      return this.$t(
        'forms.fields.password'
      )
    }
  },
  methods: {
    focus () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
