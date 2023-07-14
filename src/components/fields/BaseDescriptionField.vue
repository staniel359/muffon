<template>
  <BaseInputContainer
    class="fluid field"
  >
    <textarea
      type="text"
      name="description"
      rows="4"
      :placeholder="descriptionText"
      :value="value"
      @keypress.ctrl.enter="handleCtrlEnter"
    />
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseDescriptionField',
  components: {
    BaseInputContainer
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
