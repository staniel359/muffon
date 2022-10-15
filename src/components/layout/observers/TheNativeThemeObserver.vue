<template>
  <div
    id="the-native-theme-observer"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'TheNativeThemeObserver',
  computed: {
    ...mapState(
      'layout',
      [
        'isWithSystemTheme'
      ]
    )
  },
  watch: {
    isWithSystemTheme: 'handleIsWithSystemThemeChange'
  },
  mounted () {
    ipcRenderer.on(
      'update-native-theme',
      this.handleUpdateNativeTheme
    )
  },
  methods: {
    handleIsWithSystemThemeChange (
      value
    ) {
      if (value) {
        ipcRenderer.invoke(
          'check-native-theme'
        ).then(
          this.handleCheckNativeTheme
        )
      }
    },
    handleCheckNativeTheme (
      {
        isDarkMode
      }
    ) {
      this.updateIsDarkMode(
        isDarkMode
      )
    },
    handleUpdateNativeTheme (
      _,
      {
        isDarkMode
      }
    ) {
      this.updateIsDarkMode(
        isDarkMode
      )
    },
    updateIsDarkMode (
      value
    ) {
      updateGlobalStore(
        {
          'layout.isDarkMode': value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
