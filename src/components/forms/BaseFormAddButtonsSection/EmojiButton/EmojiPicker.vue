<template>
  <div
    ref="picker"
    class="emoji-picker"
    :class="{
      open: isOpen,
      inverted: isDarkMode
    }"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  Picker
} from 'emoji-mart'
import data from '@emoji-mart/data'
import {
  formatLocales
} from '*/helpers/actions/locales'

export default {
  name: 'EmojiPicker',
  emits: [
    'select'
  ],
  data () {
    return {
      isOpen: false
    }
  },
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
    pickerData () {
      return {
        data,
        i18n: this.locale,
        parent: this.$refs.picker,
        previewPosition: 'none',
        set: 'native',
        theme: this.theme,
        onEmojiSelect:
          this.handleEmojiSelect,
        onClickOutside:
          this.handleClickOutside
      }
    },
    locale () {
      return this.locales[
        this.profileLanguage
      ]
    },
    locales () {
      return formatLocales(
        {
          importLocaleFile: this.importLocaleFile
        }
      )
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
      this.pickerData
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
    handleClickOutside () {
      this.isOpen = false
    },
    show () {
      this.isOpen = true
    },
    importLocaleFile (
      {
        code
      }
    ) {
      return require(
        `@emoji-mart/data/i18n/${code}.json`
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.emoji-picker
  @extend .d-none, .absolute
  z-index: 10
  margin-top: -200px
  margin-left: 35px
  ::v-deep(em-emoji-picker)
    max-height: 300px
    border: $border
    --font-family: LatoDefault
  &.inverted
    ::v-deep(em-emoji-picker)
      border: $borderInverted
  &.open
    @extend .d-block
</style>
