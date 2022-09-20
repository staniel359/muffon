<template>
  <div
    id="the-electron-store-observer"
  />
</template>

<script>
import {
  mapActions
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import electronStore from '@/plugins/electronStore'
import {
  updateLocal as updateLocalStore
} from '@/helpers/actions/store'

export default {
  name: 'TheElectronStoreObserver',
  computed: {
    electronStoreKeysValues () {
      return Object.entries(
        electronStore.store
      )
    }
  },
  mounted () {
    ipcRenderer.on(
      'set-tab-id',
      this.handleSetTabId
    )

    this.electronStoreKeysValues.forEach(
      this.setStoreKeyValue
    )
  },
  methods: {
    ...mapActions(
      'layout',
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
