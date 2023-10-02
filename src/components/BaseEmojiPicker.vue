<template>
  <div
    ref="picker"
    class="base-emoji-picker"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import {
  Picker
} from 'emoji-mart'
import pickerData from '@emoji-mart/data'

export default {
  name: 'BaseEmojiPicker',
  emits: [
    'select'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    ),
    pickerOptions () {
      return {
        data: pickerData,
        locale:
          this.profileLanguage,
        parent: this.$refs.picker,
        previewPosition: 'none',
        set: 'native',
        theme: this.theme,
        onEmojiSelect:
          this.handleEmojiSelect
      }
    },
    theme () {
      if (this.isDarkMode) {
        return 'dark'
      } else {
        return 'light'
      }
    }
  },
  mounted () {
    const picker =
      new Picker(
        this.pickerOptions
      )

    this.addStyle(
      picker
    )
  },
  methods: {
    handleEmojiSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    addStyle (
      picker
    ) {
      const style = new CSSStyleSheet()

      style.replaceSync(
        '#root { --sidebar-width: 10px }'
      )

      picker
        .shadowRoot
        .adoptedStyleSheets
        .push(
          style
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
