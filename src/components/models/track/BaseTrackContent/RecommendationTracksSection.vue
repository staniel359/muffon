<template>
  <BaseLinkContainer
    :link="{}"
  >
    <BaseListCounterSection
      class="main-link"
      icon="track"
      :count="recommendationTracksCount"
      @click="handleCounterClick"
    />

    <BaseRecommendationTrackTracksModal
      ref="modal"
      :recommendation-id="recommendationId"
    />
  </BaseLinkContainer>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'

const BaseRecommendationTrackTracksModal =
  defineAsyncComponent(
    () => import(
      '@/components/modals/recommendation/track/BaseRecommendationTrackTracksModal.vue'
    )
  )

export default {
  name: 'RecommendationTracksSection',
  components: {
    BaseLinkContainer,
    BaseListCounterSection,
    BaseRecommendationTrackTracksModal
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    recommendationTracksCount () {
      return this.recommendationData.tracks_count
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
        ?.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
