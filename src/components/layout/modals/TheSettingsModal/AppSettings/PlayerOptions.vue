<template>
  <div class="main-settings-options-block">
    <AudioSourcesOption />

    <BitrateOption />

    <AlbumOption />
  </div>
</template>

<script>
import AudioSourcesOption from './PlayerOptions/AudioSourcesOption.vue'
import BitrateOption from './PlayerOptions/BitrateOption.vue'
import AlbumOption from './PlayerOptions/AlbumOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    AudioSourcesOption,
    BitrateOption,
    AlbumOption
  }
}
</script>

<style lang="sass" scoped></style>
