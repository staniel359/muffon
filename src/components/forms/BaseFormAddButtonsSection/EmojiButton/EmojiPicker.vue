<template>
  <div
    ref="picker"
    :key="key"
    class="emoji-picker"
    :class="{
      open: isOpen,
      inverted: isDarkMode
    }"
    @click.stop
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
  generateKey
} from '*/helpers/utils'

export default {
  name: 'EmojiPicker',
  emits: [
    'select'
  ],
  data () {
    return {
      key: null,
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
        locale: this.profileLanguage,
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
    theme () {
      if (this.isDarkMode) {
        return 'dark'
      } else {
        return 'light'
      }
    }
  },
  watch: {
    profileLanguage: 'handleProfileLanguageChange',
    isDarkMode: 'handleIsDarkModeChange'
  },
  mounted () {
    this.initialize()
  },
  methods: {
    handleProfileLanguageChange () {
      this.initialize()
    },
    handleIsDarkModeChange () {
      this.initialize()
    },
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
    async initialize () {
      this.key = generateKey()

      await this.$nextTick()

      new Picker(
        this.pickerData
      )
    },
    toggle () {
      this.isOpen = !this.isOpen
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
    --font-family: Lato, LatoDefault
  &.inverted
    ::v-deep(em-emoji-picker)
      border: $borderInverted
  &.open
    @extend .d-block
</style>
