<template>
  <div class="extra-controls-panel">
    <QueueButton />
    <VolumeButton />
    <CloseButton />
  </div>
</template>

<script>
import QueueButton from './ExtraControlsPanel/QueueButton.vue'
import VolumeButton from './ExtraControlsPanel/VolumeButton.vue'
import CloseButton from './ExtraControlsPanel/CloseButton.vue'

export default {
  name: 'ExtraControlsPanel',
  components: {
    QueueButton,
    VolumeButton,
    CloseButton
  }
}
</script>

<style lang="sass" scoped>
.extra-controls-panel
  @extend .text-align-right
  flex: 0.25
</style>
