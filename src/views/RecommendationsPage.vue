<template>
  <BaseRecommendationsPageContainer
    ref="page"
    :limit="limit"
    @reset="handleReset"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.recommendationsData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        is-with-top-segment
      >
        <template #top>
          <BaseFilterButton
            :is-active="isShowFilter"
            @click="handleFilterButtonClick"
          />
        </template>

        <template #topExtra>
          <FilterSection
            v-show="isShowFilter"
            class="filter-section"
            :is-show="isShowFilter"
          />
        </template>

        <template #default="slotProps">
          <BaseArtistsExtendedList
            :artists="slotProps[scope]"
            is-with-library-option
            is-with-favorite-option
            is-with-bookmark-option
            is-with-listened-option
            is-with-share-option
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
  from '@/components/containers/pages/recommendations/BaseRecommendationsPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseFilterButton from '@/components/buttons/BaseFilterButton.vue'
import FilterSection from './RecommendationsPage/FilterSection.vue'
import BaseArtistsExtendedList
  from '@/components/lists/artists/BaseArtistsExtendedList.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'RecommendationsPage',
  components: {
    BaseRecommendationsPageContainer,
    BasePaginatedPageContainer,
    BaseFilterButton,
    FilterSection,
    BaseArtistsExtendedList
  },
  mixins: [
    paginatedPageMixin
  ],
  data () {
    return {
      isShowFilter: false,
      limit: 10,
      scope: 'recommendations'
    }
  },
  methods: {
    handleReset () {
      this.reset()
    },
    handleFilterButtonClick () {
      this.isShowFilter =
        !this.isShowFilter
    }
  }
}
</script>

<style lang="sass" scoped>
.filter-section
  margin-top: 1em
</style>
