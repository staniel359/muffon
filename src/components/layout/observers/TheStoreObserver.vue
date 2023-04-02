<template>
  <div
    id="the-store-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  update as updateLocalStore
} from '@/helpers/actions/store/local'

export default {
  name: 'TheStoreObserver',
  mounted () {
    ipcRenderer.on(
      'update-store',
      this.handleUpdateStore
    )

    ipcRenderer.invoke(
      'get-electron-store-data'
    ).then(
      this.handleGetData
    )
  },
  methods: {
    handleUpdateStore (
      _,
      data
    ) {
      this.setStoreData(
        data
      )
    },
    handleGetData (
      data
    ) {
      this.setStoreData(
        data
      )
    },
    setStoreData (
      value
    ) {
      const storeKeysValues =
        Object.entries(
          value
        )

      storeKeysValues.forEach(
        this.setStoreKeyValue
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
