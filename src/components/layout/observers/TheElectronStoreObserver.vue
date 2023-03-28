<template>
  <div
    id="the-electron-store-observer"
  />
</template>

<script>
import {
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  ipcRenderer
} from 'electron'
import {
  update as updateLocalStore
} from '@/helpers/actions/store/local'

export default {
  name: 'TheElectronStoreObserver',
  async mounted () {
    ipcRenderer.on(
      'set-tab-id',
      this.handleSetTabId
    )

    const electronStoreData =
      await ipcRenderer.invoke(
        'get-electron-store-data'
      )

    const electronStoreKeysValues =
      Object.entries(
        electronStoreData
      )

    electronStoreKeysValues.forEach(
      this.setStoreKeyValue
    )
  },
  methods: {
    ...mapActions(
      layoutStore,
      [
        'setTabId'
      ]
    ),
    handleSetTabId (
      _,
      value
    ) {
      this.setTabId(
        value
      )
    },
    setStoreKeyValue (
      [
        key,
        value
      ]
    ) {
      updateLocalStore(
        key,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
