<template>
  <BaseFormInputContainer>
    <input
      ref="input"
      type="text"
      name="email"
      :placeholder="emailText"
      :value="value"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseProfileEmailField',
  components: {
    BaseFormInputContainer
  },
  props: {
    value: String
  },
  computed: {
    emailText () {
      return this.$t(
        'forms.fields.email'
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
