<template>
  <div class="main-settings-options-block">
    <HideLibraryArtistsOption />

    <TracksCountOption />
  </div>
</template>

<script>
import HideLibraryArtistsOption
  from './RecommendationsOptions/HideLibraryArtistsOption.vue'
import TracksCountOption from './RecommendationsOptions/TracksCountOption.vue'

export default {
  name: 'RecommendationsOptions',
  components: {
    HideLibraryArtistsOption,
    TracksCountOption
  }
}
</script>

<style lang="sass" scoped></style>
