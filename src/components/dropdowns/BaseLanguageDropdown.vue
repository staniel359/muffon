<template>
  <BaseDropdownContainer
    class="main-language-dropdown"
    :selected="profileLanguage"
    is-selection
  >
    <LanguageOption
      v-for="(localeData, index) in locales"
      :key="index"
      :locale-data="localeData"
    />
  </BaseDropdownContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseDropdownContainer
  from '*/components/containers/BaseDropdownContainer.vue'
import LanguageOption from './BaseLanguageDropdown/LanguageOption.vue'
import locales from '*/helpers/data/locales'

export default {
  name: 'BaseLanguageDropdown',
  components: {
    BaseDropdownContainer,
    LanguageOption
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    ),
    locales () {
      return locales
    }
  }
}
</script>

<style lang="sass" scoped></style>
