<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="recommendationsText"
      is-horizontal
    />

    <div>
      <HideLibraryArtistsOption />

      <TracksCountOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import HideLibraryArtistsOption
  from './RecommendationsOptions/HideLibraryArtistsOption.vue'
import TracksCountOption from './RecommendationsOptions/TracksCountOption.vue'

export default {
  name: 'RecommendationsOptions',
  components: {
    BaseDivider,
    HideLibraryArtistsOption,
    TracksCountOption
  },
  computed: {
    recommendationsText () {
      return this.$t(
        'settings.sections.app.recommendations'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
