<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="languageText"
    />

    <div
      class="ui compact selection dropdown"
      ref="dropdown"
      :class="{ inverted: isDarkMode }"
    >
      <div class="default text"></div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <div
          v-for="(languageData, index) in languages"
          class="item"
          :key="index"
          :data-value="languageData.code"
          @click="handleLanguageSelect(languageData.code)"
        >
          {{ languageData.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import BaseHeader from '@/BaseHeader.vue'
import { updateStore } from '#/actions'
import { setDropdown, setDropdownValue } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'

export default {
  name: 'LanguageOption',
  components: {
    BaseHeader
  },
  data () {
    return {
      languages: [
        {
          code: 'en',
          text: 'English'
        },
        {
          code: 'it',
          text: 'Italiano'
        },
        {
          code: 'ru',
          text: 'Русский'
        }
      ]
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
    languageText () {
      return this.$t(
        'layout.settings.options.app.main.language'
      )
    }
  },
  mounted () {
    this.$nextTick(() => {
      setDropdown(
        this.$refs.dropdown,
        mainDropdownOptions()
      )

      this.$nextTick(() => {
        setDropdownValue(
          this.$refs.dropdown,
          this.profileLanguage
        )
      })
    })
  },
  watch: {
    profileLanguage: 'handleProfileLanguageChange'
  },
  methods: {
    handleLanguageSelect (value) {
      ipcRenderer.send(
        'set-language',
        value
      )

      updateStore({
        'profile.language': value
      })
    },
    handleProfileLanguageChange (value) {
      setDropdownValue(
        this.$refs.dropdown,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
