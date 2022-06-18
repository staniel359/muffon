<template>
  <div class="player-main-controls">
    <LoopButton />

    <BackwardButton />

    <PlayButton />

    <ForwardButton />

    <VolumeButton />
  </div>
</template>

<script>
import LoopButton from './MainControlsPanel/LoopButton.vue'
import BackwardButton from './MainControlsPanel/BackwardButton.vue'
import PlayButton from './MainControlsPanel/PlayButton.vue'
import ForwardButton from './MainControlsPanel/ForwardButton.vue'
import VolumeButton from './MainControlsPanel/VolumeButton.vue'

export default {
  name: 'MainControlsPanel',
  components: {
    LoopButton,
    BackwardButton,
    PlayButton,
    ForwardButton,
    VolumeButton
  }
}
</script>

<style lang="sass" scoped>
.player-main-controls
  @extend .d-flex, .align-items-center, .justify-content-center
  flex: 0.4
</style>
