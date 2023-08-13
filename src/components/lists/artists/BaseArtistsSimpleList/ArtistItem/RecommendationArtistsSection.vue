<template>
  <BaseLinkContainer
    :link="{}"
  >
    <BaseListCounterSection
      class="main-link recommendation-artists-section"
      icon="artist"
      :count="recommendationArtistsCount"
      @active-change="handleActiveChange"
      @click="handleCounterClick"
    />

    <BaseRecommendationArtistsModal
      ref="modal"
      :recommendation-id="recommendationId"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import BaseRecommendationArtistsModal
  from '@/components/modals/recommendation/BaseRecommendationArtistsModal.vue'

export default {
  name: 'RecommendationArtistsSection',
  components: {
    BaseLinkContainer,
    BaseListCounterSection,
    BaseRecommendationArtistsModal
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'activeChange'
  ],
  computed: {
    recommendationArtistsCount () {
      return this.recommendationData.artists_count
    },
    recommendationId () {
      return this.recommendationData.id.toString()
    }
  },
  methods: {
    handleActiveChange (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
    },
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
