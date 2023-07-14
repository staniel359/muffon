<template>
  <BaseInputContainer
    class="fluid field"
  >
    <input
      ref="input"
      type="text"
      name="email"
      :placeholder="emailText"
      :value="value"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseProfileEmailField',
  components: {
    BaseInputContainer
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
