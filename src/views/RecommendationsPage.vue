<template>
  <BaseRecommendationsPageContainer
    :limit="limit"
    :filterScope="filterScope"
    :filterValue="filterValue"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="recommendationsData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :filterScope="filterScope"
        isWithRecommendationsFilters
        @filterScopeChange="handleFilterScopeChange"
        @filterValueChange="handleFilterValueChange"
      >
        <template #default="slotProps">
          <BaseArtistsExtendedList
            :artists="slotProps[scope]"
            :profileId="pageSlotProps.profileId"
            isWithLibraryOption
            isWithFavoriteOption
            isWithBookmarkOption
            isWithListenedOption
            isWithDeleteOption
            isRecommendation
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
    handleFilterScopeChange (value) {
      this.filterScope = value
    },
    handleFilterValueChange (value) {
      this.filterValue = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
