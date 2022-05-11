<template>
  <BaseButtonContainer
    class="basic compact"
    icon="smile outline"
    @click.stop="handleClick"
  >
    <EmojiPicker
      ref="picker"
      @select="handleSelect"
    />
  </BaseButtonContainer>
</template>

<script>
import BaseButtonContainer
  from '*/components/containers/buttons/BaseButtonContainer.vue'
import EmojiPicker from './EmojiButton/EmojiPicker.vue'

export default {
  name: 'EmojiButton',
  components: {
    BaseButtonContainer,
    EmojiPicker
  },
  inject: [
    'addEmoji'
  ],
  methods: {
    handleClick () {
      this.showPicker()
    },
    handleSelect (
      value
    ) {
      this.addEmoji(
        value.native
      )
    },
    showPicker () {
      this.$refs
        .picker
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
