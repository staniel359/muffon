<template>
  <BaseButtonContainer
    class="small basic circular add-button"
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
      this.togglePicker()
    },
    handleSelect (
      value
    ) {
      this.addEmoji(
        value.native
      )
    },
    togglePicker () {
      this.$refs
        .picker
        .toggle()
    }
  }
}
</script>

<style lang="sass" scoped></style>
