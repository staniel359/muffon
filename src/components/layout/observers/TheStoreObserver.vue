<template>
  <div
    id="the-store-observer"
  />
</template>

<script>
import {
  update as updateLocalStore
} from '@/helpers/actions/store/local'

export default {
  name: 'TheStoreObserver',
  emits: [
    'init'
  ],
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'update-store',
        this.handleUpdateStore
      )

    window
      .mainProcess
      .sendAsyncCommand(
        'get-settings'
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

      this.$emit(
        'init'
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
