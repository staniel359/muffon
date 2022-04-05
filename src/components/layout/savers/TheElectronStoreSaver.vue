<template>
  <div id="the-electron-store-saver"></div>
</template>

<script>
import { ipcRenderer } from 'electron'
import electronStore from '*/plugins/electronStore'

export default {
  name: 'TheElectronStoreSaver',
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
        this.setElectronStoreKeyValue
      )
    },
    setElectronStoreKeyValue ([key, value]) {
      electronStore.set({
        [key]: value
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
