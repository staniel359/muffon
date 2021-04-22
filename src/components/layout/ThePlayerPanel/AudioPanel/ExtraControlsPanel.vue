<template>
  <div class="extra-controls-panel">
    <VolumeButton />
    <QueueButton />
  </div>
</template>

<script>
import VolumeButton from './ExtraControlsPanel/VolumeButton.vue'
import QueueButton from './ExtraControlsPanel/QueueButton.vue'

export default {
  name: 'ExtraControlsPanel',
  components: {
    VolumeButton,
    QueueButton
  }
}
</script>

<style lang="sass" scoped>
.extra-controls-panel
  @extend .text-align-right
  flex: 0.25
  :last-child
    @extend .no-margin
</style>
