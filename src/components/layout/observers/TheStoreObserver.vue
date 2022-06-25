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
  updateLocal as updateLocalStore
} from '*/helpers/actions/store'

export default {
  name: 'TheStoreObserver',
  mounted () {
    ipcRenderer.on(
      'update-store',
      this.handleUpdateStore
    )
  },
  methods: {
    handleUpdateStore (
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
