<template>
  <BaseDropdown
    class="main-language-select"
    :options="locales"
    :selected="profileLanguage"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import {
  ipcRenderer
} from 'electron'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
import {
  locales
} from '#/plugins/i18n/locales'

export default {
  name: 'BaseLanguageSelect',
  components: {
    BaseDropdown
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    ),
    locales () {
      return locales
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      ipcRenderer.send(
        'set-language',
        value
      )

      updateGlobalStore(
        {
          'profile.language': value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
