<template>
  <TheNavbarPanel />
  <TheSidebarPanel />
  <TheQueuePanel />
  <ThePlayerPanel />
</template>

<script>
import TheSidebarPanel from './ThePanels/TheSidebarPanel.vue'
import TheNavbarPanel from './ThePanels/TheNavbarPanel.vue'
import TheQueuePanel from './ThePanels/TheQueuePanel.vue'
import ThePlayerPanel from './ThePanels/ThePlayerPanel.vue'

export default {
  name: 'ThePanels',
  components: {
    TheSidebarPanel,
    TheNavbarPanel,
    TheQueuePanel,
    ThePlayerPanel
  }
}
</script>

<style lang="sass" scoped></style>
