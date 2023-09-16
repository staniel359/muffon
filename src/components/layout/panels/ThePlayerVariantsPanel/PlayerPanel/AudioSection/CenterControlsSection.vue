<template>
  <div class="center-controls-section">
    <LoopButton />

    <BaseQueueDirectionButtonContainer
      position="previous"
      icon="audioPrevious"
    />

    <PlayButton />

    <BaseQueueDirectionButtonContainer
      position="next"
      icon="audioNext"
    />

    <VolumeButton />
  </div>
</template>

<script>
import LoopButton from './CenterControlsSection/LoopButton.vue'
import BaseQueueDirectionButtonContainer
  from '@/components/containers/BaseQueueDirectionButtonContainer.vue'
import PlayButton from './CenterControlsSection/PlayButton.vue'
import VolumeButton from './CenterControlsSection/VolumeButton.vue'

export default {
  name: 'CenterControlsSection',
  components: {
    LoopButton,
    BaseQueueDirectionButtonContainer,
    PlayButton,
    VolumeButton
  }
}
</script>

<style lang="sass" scoped>
.center-controls-section
  @extend .d-flex, .align-items-center, .justify-content-center
  flex: 0.4

[dir="ltr"]
  .center-controls-section
    .button
      &:not(:last-child)
        margin-right: 0.5em !important
[dir="rtl"]
  .center-controls-section
    .button
      &:not(:last-child)
        margin-left: 0.5em !important
</style>
