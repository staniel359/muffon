<template>
  <BaseButton
    ref="button"
    class="small basic circular add-button"
    icon="smile outline"
  />

  <BaseEmojiPopup
    @select="handleSelect"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseEmojiPopup from '@/components/popups/BaseEmojiPopup.vue'
import {
  setPopup
} from '@/helpers/actions/plugins/semantic'
import {
  emojiPopupOptions
} from '@/helpers/data/plugins/semantic'

export default {
  name: 'EmojiButton',
  components: {
    BaseButton,
    BaseEmojiPopup
  },
  inject: [
    'addEmoji'
  ],
  computed: {
    popupOptions () {
      return emojiPopupOptions()
    }
  },
  mounted () {
    setPopup(
      this.$refs.button.$el,
      this.popupOptions
    )
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
