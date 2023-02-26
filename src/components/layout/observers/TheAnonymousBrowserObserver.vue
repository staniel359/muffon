<template>
  <div
    id="the-anonymous-browser-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import electronStore from '#/plugins/electronStore'
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
      {
        route
      }
    ) {
      const routeData =
        JSON.parse(
          route
        )

      this.addRouteToHistory(
        routeData
      )
    },
    addRouteToHistory (
      value
    ) {
      value.created =
        moment.utc().toDate()

      const routes =
        electronStore.get(
          'history.browser'
        )

      const newRoutes = [
        ...routes,
        value
      ]

      electronStore.set(
        {
          'history.browser': newRoutes
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
