<template>
  <div class="main-settings-options-block">
    <AudioSourcesOption />

    <BitrateOption />

    <AlbumOption />

    <EqualizerOption />
  </div>
</template>

<script>
import AudioSourcesOption from './PlayerOptions/AudioSourcesOption.vue'
import BitrateOption from './PlayerOptions/BitrateOption.vue'
import AlbumOption from './PlayerOptions/AlbumOption.vue'
import EqualizerOption from './PlayerOptions/EqualizerOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    AudioSourcesOption,
    BitrateOption,
    AlbumOption,
    EqualizerOption
  }
}
</script>

<style lang="sass" scoped></style>
