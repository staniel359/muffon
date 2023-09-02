<template>
  <div class="recommendation-artists-section-container">
    <BaseListCounterSection
      class="main-link recommendation-artists-section"
      icon="artist"
      :count="recommendationArtistsCount"
      @click="handleCounterClick"
    />

    <BaseRecommendationArtistArtistsModal
      ref="modal"
      :recommendation-id="recommendationId"
    />
  </div>
</template>

<script>
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import BaseRecommendationArtistArtistsModal
  from '@/components/modals/recommendation/artist/BaseRecommendationArtistArtistsModal.vue'

export default {
  name: 'RecommendationArtistsSection',
  components: {
    BaseListCounterSection,
    BaseRecommendationArtistArtistsModal
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    recommendationArtistsCount () {
      return this.recommendationData.artists_count
    },
    recommendationId () {
      return this.recommendationData.id.toString()
    }
  },
  methods: {
    handleCounterClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.recommendation-artists-section-container
  @extend .d-flex, .justify-content-center

.recommendation-artists-section
  @extend .width-fit-content
</style>
