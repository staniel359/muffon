<template>
  <BaseInputContainer
    class="fluid field"
  >
    <input
      ref="input"
      type="text"
      name="title"
      :placeholder="titleText"
      :value="value"
    >
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseTitleField',
  components: {
    BaseInputContainer
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
