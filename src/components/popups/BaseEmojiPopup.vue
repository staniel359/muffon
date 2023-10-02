<template>
  <BaseSegmentContainer
    class="blurred main-popup-content-container no-padding"
  >
    <BaseEmojiPicker
      v-if="isCalled"
      :key="key"
      @select="handleSelect"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseEmojiPicker from '@/components/BaseEmojiPicker.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseEmojiPopup',
  components: {
    BaseSegmentContainer,
    BaseEmojiPicker
  },
  props: {
    isCalled: Boolean
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
    isDarkMode:
      'handleIsDarkModeChange'
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
