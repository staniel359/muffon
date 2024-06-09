<template>
  <div class="main-settings-options-block">
    <AutoplayOption />

    <PauseOnAudioPlayOption />
  </div>
</template>

<script>
import AutoplayOption from './VideoOptions/AutoplayOption.vue'
import PauseOnAudioPlayOption from './VideoOptions/PauseOnAudioPlayOption.vue'

export default {
  name: 'VideoOptions',
  components: {
    AutoplayOption,
    PauseOnAudioPlayOption
  }
}
</script>

<style lang="sass" scoped></style>
