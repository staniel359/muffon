<template>
  <div class="main-settings-options-block">
    <AutoplayOption />

    <PauseOnAudioPlayOption />

    <OpenLinksInNewTabOption />
  </div>
</template>

<script>
import AutoplayOption from './VideoOptions/AutoplayOption.vue'
import PauseOnAudioPlayOption
  from './VideoOptions/PauseOnAudioPlayOption.vue'
import OpenLinksInNewTabOption
  from './VideoOptions/OpenLinksInNewTabOption.vue'

export default {
  name: 'VideoOptions',
  components: {
    AutoplayOption,
    PauseOnAudioPlayOption,
    OpenLinksInNewTabOption
  }
}
</script>

<style lang="sass" scoped></style>
