<template>
  <div
    id="the-anonymous-browser-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import moment from 'moment-timezone'

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
        moment.utc().toDate()

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
