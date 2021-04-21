<template>
  <div class="main-controls-panel">
    <LoopButton />
    <BackwardButton />
    <PlayButton />
    <ForwardButton />
    <QueueButton />
  </div>
</template>

<script>
import LoopButton from './MainControlsPanel/LoopButton.vue'
import BackwardButton from './MainControlsPanel/BackwardButton.vue'
import PlayButton from './MainControlsPanel/PlayButton.vue'
import ForwardButton from './MainControlsPanel/ForwardButton.vue'
import QueueButton from './MainControlsPanel/QueueButton.vue'

export default {
  name: 'MainControlsPanel',
  components: {
    LoopButton,
    BackwardButton,
    PlayButton,
    ForwardButton,
    QueueButton
  }
}
</script>

<style lang="sass" scoped>
.main-controls-panel
  @extend .text-align-center
  flex: 0.5
</style>
