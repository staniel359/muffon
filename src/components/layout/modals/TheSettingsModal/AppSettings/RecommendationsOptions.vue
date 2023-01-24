<template>
  <div class="main-settings-options-block">
    <HideLibraryArtistsOption />

    <TracksCountOption />

    <HideListenedArtistsOption />
  </div>
</template>

<script>
import HideLibraryArtistsOption
  from './RecommendationsOptions/HideLibraryArtistsOption.vue'
import TracksCountOption from './RecommendationsOptions/TracksCountOption.vue'
import HideListenedArtistsOption
  from './RecommendationsOptions/HideListenedArtistsOption.vue'

export default {
  name: 'RecommendationsOptions',
  components: {
    HideLibraryArtistsOption,
    TracksCountOption,
    HideListenedArtistsOption
  }
}
</script>

<style lang="sass" scoped></style>
