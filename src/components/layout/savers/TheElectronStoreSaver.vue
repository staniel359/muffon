<template>
  <div
    id="the-electron-store-saver"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import electronStore from '#/plugins/electronStore'

export default {
  name: 'TheElectronStoreSaver',
  mounted () {
    ipcRenderer.on(
      'update-electron-store',
      this.handleUpdateElectronStore
    )
  },
  methods: {
    handleUpdateElectronStore (
      _,
      data
    ) {
      const storeKeysValues =
        Object.entries(
          JSON.parse(
            data
          )
        )

      storeKeysValues.forEach(
        this.setElectronStoreKeyValue
      )
    },
    setElectronStoreKeyValue (
      [
        key,
        value
      ]
    ) {
      electronStore.set(
        {
          [key]: value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
