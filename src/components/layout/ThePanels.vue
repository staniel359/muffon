<template>
  <TheNavbarPanel />
  <TheQueuePanel />
  <ThePlayerPanel />
</template>

<script>
import TheNavbarPanel from './ThePanels/TheNavbarPanel.vue'
import TheQueuePanel from './ThePanels/TheQueuePanel.vue'
import ThePlayerPanel from './ThePanels/ThePlayerPanel.vue'

export default {
  name: 'ThePanels',
  components: {
    TheNavbarPanel,
    TheQueuePanel,
    ThePlayerPanel
  }
}
</script>

<style lang="sass" scoped></style>
