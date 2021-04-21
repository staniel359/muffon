<template>
  <div class="extra-controls-panel">
    <VolumeButton />
    <CloseButton />
  </div>
</template>

<script>
import VolumeButton from './ExtraControlsPanel/VolumeButton.vue'
import CloseButton from './ExtraControlsPanel/CloseButton.vue'

export default {
  name: 'ExtraControlsPanel',
  components: {
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
