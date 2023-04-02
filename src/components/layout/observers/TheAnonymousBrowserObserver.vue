<template>
  <div
    id="the-anonymous-browser-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  currentTime as formatCurrentTime
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'TheAnonymousBrowserObserver',
  mounted () {
    ipcRenderer.on(
      'navigate',
      this.handleNavigate
    )
  },
  methods: {
    handleNavigate (
      _,
      routeData
    ) {
      routeData.created =
        formatCurrentTime()

      this.addRouteToHistory(
        routeData
      )
    },
    addRouteToHistory (
      value
    ) {
      const routeFormatted =
        JSON.stringify(
          value
        )

      ipcRenderer.invoke(
        'add-electron-store-value',
        'history.browser',
        routeFormatted
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
