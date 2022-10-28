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
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'vuex'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'
import {
  locales
} from '@/../shared/locales'

export default {
  name: 'BaseLanguageSelect',
  components: {
    BaseDropdown
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
