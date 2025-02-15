<template>
  <div
    id="the-tray-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import windowStore from '@/stores/window'

export default {
  name: 'TheWindowObserver',
  computed: {
    ...mapState(
      windowStore,
      [
        'isWithTrayIcon'
      ]
    )
  },
  watch: {
    isWithTrayIcon:
      'handleIsWithTrayIconChange'
  },
  methods: {
    handleIsWithTrayIconChange (
      value
    ) {
      window
        .mainProcess
        .sendCommand(
          'toggle-tray',
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
