<template>
  <div id="the-online-observer"></div>
</template>

<script>
import { ipcRenderer } from 'electron'
import updateOnline from '#/actions/api/online/update'

export default {
  name: 'TheOnlineObserver',
  mounted () {
    ipcRenderer.on(
      'handle-exit',
      this.handleExit
    )

    this.setOnline(1)
  },
  beforeUnmount () {
    this.setOnline(0)
  },
  methods: {
    handleExit () {
      this.setOnline(0).finally(
        this.handleOnlineFinish
      )
    },
    handleOnlineFinish () {
      ipcRenderer.send(
        'exit'
      )
    },
    setOnline (value) {
      return updateOnline({
        isOnline: value
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
