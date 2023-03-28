<template>
  <div
    id="the-native-theme-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  ipcRenderer
} from 'electron'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TheNativeThemeObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithSystemTheme'
      ]
    )
  },
  watch: {
    isWithSystemTheme:
      'handleIsWithSystemThemeChange'
  },
  mounted () {
    ipcRenderer.on(
      'update-native-theme',
      this.handleUpdateNativeTheme
    )
  },
  methods: {
    async handleIsWithSystemThemeChange (
      value
    ) {
      if (value) {
        const data =
          await this.checkNativeTheme()

        this.updateIsDarkMode(
          data.isDarkMode
        )
      }
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
    checkNativeTheme () {
      return ipcRenderer.invoke(
        'check-native-theme'
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
