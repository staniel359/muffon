<template>
  <div
    ref="picker"
    class="main-emoji-picker"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
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
      'layout',
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    ),
    pickerOptions () {
      return {
        data: pickerData,
        locale: this.profileLanguage,
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
    new Picker(
      this.pickerOptions
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
