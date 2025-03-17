<template>
  <div class="main-settings-options-block">
    <AudioSourcesOption />

    <AutomatchOption />

    <BitrateOption />

    <AlbumOption />

    <EqualizerOption />

    <PlayingFocusOption />

    <PauseOnVideoPlayOption />
  </div>
</template>

<script>
import AudioSourcesOption from './PlayerOptions/AudioSourcesOption.vue'
import AutomatchOption from './PlayerOptions/AutomatchOption.vue'
import BitrateOption from './PlayerOptions/BitrateOption.vue'
import AlbumOption from './PlayerOptions/AlbumOption.vue'
import EqualizerOption from './PlayerOptions/EqualizerOption.vue'
import PlayingFocusOption from './PlayerOptions/PlayingFocusOption.vue'
import PauseOnVideoPlayOption from './PlayerOptions/PauseOnVideoPlayOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    AudioSourcesOption,
    AutomatchOption,
    BitrateOption,
    AlbumOption,
    EqualizerOption,
    PlayingFocusOption,
    PauseOnVideoPlayOption
  }
}
</script>

<style lang="sass" scoped></style>
