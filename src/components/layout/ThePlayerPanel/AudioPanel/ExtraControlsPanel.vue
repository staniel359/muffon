<template>
  <div class="extra-controls-panel">
    <VolumeButton />
  </div>
</template>

<script>
import VolumeButton from './ExtraControlsPanel/VolumeButton.vue'

export default {
  name: 'ExtraControlsPanel',
  components: {
    VolumeButton
  }
}
</script>

<style lang="sass" scoped>
.extra-controls-panel
  @extend .text-align-right
  flex: 0.25
</style>
