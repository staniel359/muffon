<template>
  <BaseFormInputContainer>
    <input
      ref="input"
      type="text"
      name="title"
      :placeholder="titleText"
      :value="value"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseTitleField',
  components: {
    BaseFormInputContainer
  },
  props: {
    value: String
  },
  computed: {
    titleText () {
      return this.$t(
        'forms.fields.title'
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
