<template>
  <div class="player-main-controls">
    <ShuffleButton />
    <BackwardButton />
    <PlayButton />
    <ForwardButton />
    <LoopButton />
  </div>
</template>

<script>
import ShuffleButton from './MainControlsPanel/ShuffleButton.vue'
import BackwardButton from './MainControlsPanel/BackwardButton.vue'
import PlayButton from './MainControlsPanel/PlayButton.vue'
import ForwardButton from './MainControlsPanel/ForwardButton.vue'
import LoopButton from './MainControlsPanel/LoopButton.vue'

export default {
  name: 'MainControlsPanel',
  components: {
    ShuffleButton,
    BackwardButton,
    PlayButton,
    ForwardButton,
    LoopButton
  }
}
</script>

<style lang="sass" scoped>
.player-main-controls
  @extend .text-align-center
  flex: 0.5
  :last-child
    @extend .no-margin
</style>
