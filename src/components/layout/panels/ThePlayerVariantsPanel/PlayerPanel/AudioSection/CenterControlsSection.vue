<template>
  <div class="center-controls-section">
    <LoopButton />

    <BackwardButton />

    <PlayButton />

    <ForwardButton />

    <VolumeButton />
  </div>
</template>

<script>
import LoopButton from './CenterControlsSection/LoopButton.vue'
import BackwardButton from './CenterControlsSection/BackwardButton.vue'
import PlayButton from './CenterControlsSection/PlayButton.vue'
import ForwardButton from './CenterControlsSection/ForwardButton.vue'
import VolumeButton from './CenterControlsSection/VolumeButton.vue'

export default {
  name: 'CenterControlsSection',
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
.center-controls-section
  @extend .d-flex, .align-items-center, .justify-content-center
  flex: 0.4
  .button
    &:not(:last-child)
      margin-right: 0.5em !important
</style>
