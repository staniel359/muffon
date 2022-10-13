<template>
  <BasePopupContainer
    class="main-emoji-popup"
  >
    <BaseEmojiPicker
      :key="key"
      @select="handleSelect"
    />
  </BasePopupContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BasePopupContainer from '@/components/containers/BasePopupContainer.vue'
import BaseEmojiPicker from '@/components/BaseEmojiPicker.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseEmojiPopup',
  components: {
    BasePopupContainer,
    BaseEmojiPicker
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
