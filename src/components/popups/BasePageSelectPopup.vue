<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <BaseNumberInput
      class="page-input"
      :value="1"
      :min="1"
      :max="totalPages"
      @blur="handleBlur"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseNumberInput from '@/components/inputs/BaseNumberInput.vue'

export default {
  name: 'BasePageSelectPopup',
  components: {
    BaseSegmentContainer,
    BaseNumberInput
  },
  props: {
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: [
    'select'
  ],
  methods: {
    handleBlur (
      value
    ) {
      const isSelectPage = (
        value &&
          value > 0 &&
          value <= this.totalPages
      )

      if (isSelectPage) {
        this.$emit(
          'select',
          value
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.page-input
  width: 80px
</style>
