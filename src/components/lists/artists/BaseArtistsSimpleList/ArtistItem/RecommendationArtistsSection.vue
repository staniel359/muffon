<template>
  <BaseLinkContainer
    :link="{}"
  >
    <BaseListCounterSection
      class="main-link"
      icon="artist"
      :count="recommendationArtistsCount"
      @active-change="handleActiveChange"
      @click="handleCounterClick"
    />

    <BaseRecommendationArtistArtistsModal
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

const BaseRecommendationArtistArtistsModal =
  defineAsyncComponent(
    () => import(
      '@/components/modals/recommendation/artist/BaseRecommendationArtistArtistsModal.vue'
    )
  )

export default {
  name: 'RecommendationArtistsSection',
  components: {
    BaseLinkContainer,
    BaseListCounterSection,
    BaseRecommendationArtistArtistsModal
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
      return this.recommendationData.id
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
        ?.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
