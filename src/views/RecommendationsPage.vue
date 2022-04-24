<template>
  <BaseRecommendationsPageContainer
    ref="page"
    :limit="limit"
    @reset="handleReset"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        ref="pagination"
        response-data-name="recommendationsData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
        is-with-top-segment
      >
        <template #top>
          <FilterSection />
        </template>

        <template #default="slotProps">
          <BaseArtistsExtendedList
            :artists="slotProps[scope]"
            is-with-library-option
            is-with-favorite-option
            is-with-bookmark-option
            is-with-listened-option
            is-with-delete-option
            is-recommendation
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseRecommendationsPageContainer>
</template>

<script>
import BaseRecommendationsPageContainer
  from '*/components/containers/pages/recommendations/BaseRecommendationsPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import FilterSection from './RecommendationsPage/FilterSection.vue'
import BaseArtistsExtendedList
  from '*/components/lists/artists/BaseArtistsExtendedList.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'RecommendationsPage',
  components: {
    BaseRecommendationsPageContainer,
    BasePaginatedPageContainer,
    FilterSection,
    BaseArtistsExtendedList
  },
  mixins: [
    paginatedPageMixin
  ],
  data () {
    return {
      limit: 10,
      scope: 'recommendations'
    }
  },
  methods: {
    handleReset () {
      this.reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
