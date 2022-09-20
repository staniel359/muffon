<template>
  <div class="main-settings-options-block">
    <SourceOption />

    <FallbackSourcesOption />

    <BitrateOption />

    <AlbumOption />
  </div>
</template>

<script>
import SourceOption from './PlayerOptions/SourceOption.vue'
import FallbackSourcesOption from './PlayerOptions/FallbackSourcesOption.vue'
import BitrateOption from './PlayerOptions/BitrateOption.vue'
import AlbumOption from './PlayerOptions/AlbumOption.vue'

export default {
  name: 'PlayerOptions',
  components: {
    SourceOption,
    FallbackSourcesOption,
    BitrateOption,
    AlbumOption
  }
}
</script>

<style lang="sass" scoped></style>
