<template>
  <div
    id="the-browser-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import updateHistory from '@/helpers/actions/api/history/update'

export default {
  name: 'TheBrowserObserver',
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
      updateHistory(
        {
          scope: 'browser',
          route: routeData
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
