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
        ipcRenderer.send(
          'check-native-theme'
        )
      }
    },
    handleUpdateNativeTheme (
      _,
      {
        isDarkMode
      }
    ) {
      updateGlobalStore(
        {
          'layout.isDarkMode': isDarkMode
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
