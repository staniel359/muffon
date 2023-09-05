<template>
  <div class="main-settings-options-block">
    <ArtistsSection />

    <TracksSection />
  </div>
</template>

<script>
import ArtistsSection from './RecommendationsOptions/ArtistsSection.vue'
import TracksSection from './RecommendationsOptions/TracksSection.vue'

export default {
  name: 'RecommendationsOptions',
  components: {
    ArtistsSection,
    TracksSection
  }
}
</script>

<style lang="sass" scoped></style>
