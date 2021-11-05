<template>
  <BaseRecommendationsPageContainer
    :responsePageLimit="limit"
    :filter="filter"
    :filterValue="filterValue"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
        :isLoading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
      >
        <FiltersBlock
          :filter="filter"
          @filterChange="handleFilterChange"
          @filterValueChange="handleFilterValueChange"
        />

        <BaseDivider />

        <BasePaginatedContainer
          ref="paginatedContainer"
          scope="recommendations"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.recommendationsData"
          :clientPageLimit="limit"
          :responsePageLimit="limit"
          @focus="handleFocus"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BaseArtistsExtendedList
              :artists="slotProps.recommendations"
              :profileId="profileId"
              isWithLibraryOption
              isWithFavoriteOption
              isWithBookmarkOption
              isWithListenedOption
              isWithDeleteOption
              isRecommendation
            />
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseRecommendationsPageContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseRecommendationsPageContainer
  from '@/containers/pages/recommendations/BaseRecommendationsPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import FiltersBlock from './RecommendationsPage/FiltersBlock.vue'
import BaseDivider from '@/BaseDivider.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseArtistsExtendedList
  from '@/lists/artists/BaseArtistsExtendedList.vue'

export default {
  name: 'RecommendationsPage',
  components: {
    BaseRecommendationsPageContainer,
    BaseSegmentContainer,
    FiltersBlock,
    BaseDivider,
    BasePaginatedContainer,
    BaseArtistsExtendedList
  },
  data () {
    return {
      filter: null,
      filterValue: null,
      limit: 10
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    },
    handleFilterChange (value) {
      this.filter = value
    },
    handleFilterValueChange (value) {
      this.filterValue = value

      this.$refs.paginatedContainer.reset()
    }
  }
}
</script>

<style lang="sass" scoped>
.main-paginated-page-segment-container
  @extend .flex-column
</style>
