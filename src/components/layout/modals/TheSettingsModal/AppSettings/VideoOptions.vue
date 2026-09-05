<template>
  <div class="main-settings-options-block">
    <AutoplayOption />

    <PauseOnAudioPlayOption />

    <OpenLinksInNewTabOption />

    <PlayingFocusOption />
  </div>
</template>

<script>
import AutoplayOption from './VideoOptions/AutoplayOption.vue'
import PauseOnAudioPlayOption
  from './VideoOptions/PauseOnAudioPlayOption.vue'
import OpenLinksInNewTabOption
  from './VideoOptions/OpenLinksInNewTabOption.vue'
import PlayingFocusOption from './VideoOptions/PlayingFocusOption.vue'

export default {
  name: 'VideoOptions',
  components: {
    AutoplayOption,
    PauseOnAudioPlayOption,
    OpenLinksInNewTabOption,
    PlayingFocusOption
  }
}
</script>

<style lang="sass" scoped></style>
