<template>
  <BaseButton
    ref="button"
    class="small basic circular add-button"
    icon="emoji"
  />

  <BaseEmojiPopup
    @select="handleSelect"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseEmojiPopup from '@/components/popups/BaseEmojiPopup.vue'
import {
  emojiPopupOptions
} from '@/helpers/formatters/semantic'
import popupMixin from '@/mixins/popupMixin'

export default {
  name: 'EmojiButton',
  components: {
    BaseButton,
    BaseEmojiPopup
  },
  mixins: [
    popupMixin
  ],
  inject: [
    'addEmoji'
  ],
  computed: {
    element () {
      return this.$refs.button.$el
    },
    popupOptions () {
      return emojiPopupOptions()
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.addEmoji(
        value.native
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
