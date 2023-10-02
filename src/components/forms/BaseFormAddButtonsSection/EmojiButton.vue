<template>
  <BaseButton
    ref="button"
    class="small basic circular"
    icon="emoji"
  />

  <div class="main-popup-container">
    <BaseEmojiPopup
      ref="popup"
      :is-called="isCalled"
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
import {
  reposition as repositionPopup
} from '@/helpers/actions/plugins/semantic/popup'

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
  data () {
    return {
      isCalled: false
    }
  },
  computed: {
    element () {
      return this.$refs.button.$el
    },
    popupOptions () {
      return emojiPopupOptions(
        {
          html: this.popup,
          onShow: this.handleShow
        }
      )
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.addEmoji(
        value.native
      )
    },
    async handleShow () {
      this.isCalled = true

      await this.$nextTick()

      repositionPopup(
        this.element
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
