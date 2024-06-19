<template>
  <div>
    <BaseAccordionContainer
      :title="headerText"
    >
      <KeyboardShortcutItem
        v-for="(keyboardShortcutData, index) in keyboardShortcuts"
        :key="index"
        :keyboard-shortcut-data="keyboardShortcutData"
      />
    </BaseAccordionContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseAccordionContainer
  from '@/components/containers/BaseAccordionContainer.vue'
import KeyboardShortcutItem
  from './KeyboardShortcutsSection/KeyboardShortcutItem.vue'
import {
  systemName
} from '@/helpers/data/env'

export default {
  name: 'KeyboardShortcutsSection',
  components: {
    BaseAccordionContainer,
    KeyboardShortcutItem
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    ),
    headerText () {
      return this.$t(
        'keyboardShortcuts.header'
      )
    },
    keyboardShortcuts () {
      return [
        {
          keys: [
            this.ctrlKey,
            'F'
          ],
          textScope: 'search'
        },
        {
          keys: [
            this.ctrlKey,
            '←'
          ],
          textScope: 'audioBackward'
        },
        {
          keys: [
            this.ctrlKey,
            '→'
          ],
          textScope: 'audioForward'
        },
        {
          keys: [
            'Shift',
            '→'
          ],
          textScope: 'radioNextTrack'
        }
      ]
    },
    ctrlKey () {
      if (this.isMacos) {
        return 'Cmd'
      } else if (this.isGermanLanguage) {
        return 'Strg'
      } else {
        return 'Ctrl'
      }
    },
    isMacos () {
      return (
        systemName === 'macos'
      )
    },
    isGermanLanguage () {
      return (
        this.profileLanguage === 'de'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
