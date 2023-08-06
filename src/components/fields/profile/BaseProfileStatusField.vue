<template>
  <BaseFormInputContainer>
    <textarea
      type="text"
      name="status"
      rows="4"
      :placeholder="statusText"
      :value="status"
      @keypress.ctrl.enter="handleCtrlEnter"
    />
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

export default {
  name: 'BaseProfileStatusField',
  components: {
    BaseFormInputContainer
  },
  props: {
    status: String
  },
  emits: [
    'submit'
  ],
  computed: {
    statusText () {
      return this.$t(
        'forms.fields.status'
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
