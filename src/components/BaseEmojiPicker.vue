<template>
  <emoji-picker
    ref="picker"
    class="base-emoji-picker"
    :class="{
      dark: isDarkMode
    }"
    :i18n="localeData"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import 'emoji-picker-element'
import de from 'emoji-picker-element/i18n/de'
import en from 'emoji-picker-element/i18n/en'
import es from 'emoji-picker-element/i18n/es'
import fr from 'emoji-picker-element/i18n/fr'
import it from 'emoji-picker-element/i18n/it'
import ja from 'emoji-picker-element/i18n/ja'
import pl from 'emoji-picker-element/i18n/pl'
import ru from 'emoji-picker-element/i18n/ru_RU'
import tr from 'emoji-picker-element/i18n/tr'
import zh from 'emoji-picker-element/i18n/zh_CN'

// I18n

export default {
  name: 'BaseEmojiPicker',
  emits: [
    'select'
  ],
  data () {
    return {
      locales: {
        be: en,
        de,
        en,
        es,
        fr,
        he: en,
        it,
        ja,
        ko: en,
        pl,
        ru,
        tr,
        zh
      }
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
    ),
    localeData () {
      return this.locales[
        this.profileLanguage
      ]
    }
  },
  mounted () {
    this
      .$refs
      .picker
      .addEventListener(
        'emoji-click',
        this.handleEmojiSelect
      )
  },
  methods: {
    handleEmojiSelect (
      event
    ) {
      const emoji =
        event.detail.unicode

      this.$emit(
        'select',
        emoji
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
