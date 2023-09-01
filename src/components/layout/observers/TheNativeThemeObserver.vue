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
      'native-theme-updated',
      this.handleNativeThemeUpdated
    )
  },
  methods: {
    async handleIsWithSystemThemeChange (
      value
    ) {
      if (value) {
        const nativeThemeData =
          await this.checkNativeTheme()

        const {
          isDarkMode
        } = nativeThemeData

        this.updateIsDarkMode(
          isDarkMode
        )
      }
    },
    handleNativeThemeUpdated (
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
