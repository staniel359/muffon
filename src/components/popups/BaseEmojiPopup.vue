<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <BaseEmojiPicker
      @select="handleSelect"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseEmojiPicker from '@/components/BaseEmojiPicker.vue'

export default {
  name: 'BaseEmojiPopup',
  components: {
    BaseSegmentContainer,
    BaseEmojiPicker
  },
  emits: [
    'select'
  ],
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
