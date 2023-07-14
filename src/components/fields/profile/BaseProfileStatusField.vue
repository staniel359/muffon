<template>
  <BaseInputContainer
    class="fluid field"
  >
    <textarea
      type="text"
      name="status"
      rows="4"
      :placeholder="statusText"
      :value="status"
      @keypress.ctrl.enter="handleCtrlEnter"
    />
  </BaseInputContainer>
</template>

<script>
import BaseInputContainer
  from '@/components/containers/inputs/BaseInputContainer.vue'

export default {
  name: 'BaseProfileStatusField',
  components: {
    BaseInputContainer
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
