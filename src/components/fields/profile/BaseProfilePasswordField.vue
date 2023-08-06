<template>
  <BaseFormInputContainer>
    <input
      ref="input"
      type="password"
      name="password"
      :placeholder="passwordText"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseProfilePasswordField',
  components: {
    BaseFormInputContainer
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
