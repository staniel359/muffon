<template>
  <div
    class="ui popup main-popup main-emoji-popup"
    :class="{
      inverted: isDarkMode,
      'main-emoji-popup-modal': isModal
    }"
  >
    <BaseEmojiPicker
      :key="key"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import BaseEmojiPicker from '@/components/BaseEmojiPicker.vue'
import {
  generateKey
} from '#/helpers/utils'

export default {
  name: 'BaseEmojiPopup',
  components: {
    BaseEmojiPicker
  },
  props: {
    isModal: Boolean
  },
  emits: [
    'select'
  ],
  data () {
    return {
      key: null
    }
  },
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
    )
  },
  watch: {
    profileLanguage:
      'handleProfileLanguageChange',
    isDarkMode: 'handleIsDarkModeChange'
  },
  methods: {
    handleProfileLanguageChange () {
      this.key = generateKey()
    },
    handleIsDarkModeChange () {
      this.key = generateKey()
    },
    handleSelect (
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
