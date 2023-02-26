<template>
  <div
    id="the-browser-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import socketMixin from '@/mixins/socketMixin'

export default {
  name: 'TheBrowserObserver',
  mixins: [
    socketMixin
  ],
  data () {
    return {
      channel: 'BrowserChannel'
    }
  },
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
      if (this.isSubscribed) {
        const routeData =
          JSON.parse(
            route
          )

        this.addRouteToHistory(
          routeData
        )
      }
    },
    addRouteToHistory (
      value
    ) {
      const updateData =
        JSON.stringify(
          {
            action: 'update',
            payload: {
              route: value
            }
          }
        )

      const updateRouteMessage =
        JSON.stringify(
          {
            command: 'message',
            identifier: this.identifier,
            data: updateData
          }
        )

      this.socket.send(
        updateRouteMessage
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
