<template>
  <div id="the-local-saver"></div>
</template>

<script>
import { ipcRenderer } from 'electron'
import local from '*/plugins/local'

export default {
  name: 'TheLocalSaver',
  mounted () {
    ipcRenderer.on(
      'handle-update-store',
      this.handleUpdateStore
    )
  },
  methods: {
    handleUpdateStore (_, data) {
      const storeKeysValues = Object.entries(
        JSON.parse(data)
      )

      storeKeysValues.forEach(
        this.setLocalKeyValue
      )
    },
    setLocalKeyValue ([key, value]) {
      local.set({
        [key]: value
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
