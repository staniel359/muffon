<template>
  <BaseButton
    ref="button"
    class="small basic circular"
    icon="emoji"
  />

  <div class="main-popup-container">
    <BaseEmojiPopup
      ref="popup"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseEmojiPopup from '@/components/popups/BaseEmojiPopup.vue'
import emojiPopupOptions
  from '@/helpers/formatters/plugins/semantic/options/popup/emoji'
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
      return emojiPopupOptions(
        {
          html: this.popup
        }
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.addEmoji(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
