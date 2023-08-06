<template>
  <BaseFormInputContainer>
    <textarea
      type="text"
      name="description"
      rows="4"
      :placeholder="descriptionText"
      :value="value"
      @keypress.ctrl.enter="handleCtrlEnter"
    />
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseDescriptionField',
  components: {
    BaseFormInputContainer
  },
  props: {
    value: String
  },
  emits: [
    'submit'
  ],
  computed: {
    descriptionText () {
      return this.$t(
        'forms.fields.description'
      )
    }
  },
  methods: {
    handleCtrlEnter () {
      this.$emit(
        'submit'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
