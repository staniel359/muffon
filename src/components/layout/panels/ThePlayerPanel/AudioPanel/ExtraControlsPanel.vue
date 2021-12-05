<template>
  <div class="player-extra-controls">
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
.player-extra-controls
  @extend .d-flex, .align-items-center, .justify-content-flex-end
  flex: 0.25
  & > :last-child
    @extend .no-margin
</style>
