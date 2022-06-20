<template>
  <div
    ref="dropdown"
    class=""
    :class="[
      'ui compact selection dropdown',
      'main-language-dropdown',
      {
        inverted: isDarkMode
      }
    ]"
  >
    <div
      class="default text"
    />

    <BaseIcon
      icon="dropdown"
    />

    <div class="menu">
      <div
        v-for="(languageData, index) in languages"
        :key="index"
        class="item"
        :data-value="languageData.code"
        @click="handleLanguageSelect(languageData.code)"
        v-text="languageData.text"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import {
  setDropdown,
  setDropdownValue
} from '*/helpers/actions/plugins/semantic'
import {
  mainDropdownOptions
} from '*/helpers/data/plugins/semantic'

export default {
  name: 'BaseLanguageDropdown',
  components: {
    BaseIcon
  },
  data () {
    return {
      languages: [
        {
          code: 'en',
          text: 'English'
        },
        {
          code: 'ru',
          text: 'Русский'
        }
      ]
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
      'handleProfileLanguageChange'
  },
  async mounted () {
    await this.$nextTick()

    setDropdown(
      this.$refs.dropdown,
      mainDropdownOptions()
    )

    await this.$nextTick()

    setDropdownValue(
      this.$refs.dropdown,
      this.profileLanguage
    )
  },
  methods: {
    handleLanguageSelect (
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
    },
    handleProfileLanguageChange (
      value
    ) {
      setDropdownValue(
        this.$refs.dropdown,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
