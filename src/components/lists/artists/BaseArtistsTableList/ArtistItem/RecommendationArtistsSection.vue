<template>
  <div class="center-aligned">
    <BaseListCounterSection
      class="main-link width-fit-content"
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

<style lang="sass" scoped></style>
