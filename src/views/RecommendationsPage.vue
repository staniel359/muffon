<template>
  <BaseRecommendationsPageContainer
    :limit="limit"
    :filter-scope="filterScope"
    :filter-value="filterValue"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="recommendationsData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :filter-scope="filterScope"
        is-with-recommendations-filters
        @filter-scope-change="handleFilterScopeChange"
        @filter-value-change="handleFilterValueChange"
      >
        <template #default="slotProps">
          <BaseArtistsExtendedList
            :artists="slotProps[scope]"
            :profile-id="pageSlotProps.profileId"
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
import BaseArtistsExtendedList
  from '*/components/lists/artists/BaseArtistsExtendedList.vue'

export default {
  name: 'RecommendationsPage',
  components: {
    BaseRecommendationsPageContainer,
    BasePaginatedPageContainer,
    BaseArtistsExtendedList
  },
  data () {
    return {
      filterScope: null,
      filterValue: null,
      limit: 10,
      scope: 'recommendations'
    }
  },
  methods: {
    handleFilterScopeChange (
      value
    ) {
      this.filterScope = value
    },
    handleFilterValueChange (
      value
    ) {
      this.filterValue = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
