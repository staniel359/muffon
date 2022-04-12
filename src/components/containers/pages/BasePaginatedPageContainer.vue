<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-page-segment-container'
    ]"
  >
    <BaseSegmentContainer
      v-if="isWithArtistSelect"
    >
      <BaseArtistSourceSelect
        :artistName="artistName"
        @artistDataChange="handleArtistDataChange"
      />
    </BaseSegmentContainer>

    <BaseSegmentContainer
      v-if="isWithRecommendationsFilters"
    >
      <BaseRecommendationsFilters
        :filterScope="filterScope"
        @filterScopeChange="handleFilterScopeChange"
        @filterValueChange="handleFilterValueChange"
      />
    </BaseSegmentContainer>

    <BaseSegmentContainer
      v-if="isWithViewChange || isWithLibrarySearch"
      class="search-view-buttons-segment"
    >
      <BaseProfileLibrarySearchInput
        v-if="isWithLibrarySearch"
        :isClearable="isLibrarySearchClearable"
        :query="query"
        @submit="handleSearchSubmit"
        @clear="handleSearchClear"
      />

      <BaseViewChangeButtons
        v-if="isWithViewChange"
        :viewIndex="viewIndex"
        @viewButtonClick="handleViewButtonClick"
      />
    </BaseSegmentContainer>

    <BasePaginatedSegmentContainer
      ref="segment"
      class="main-paginated-page-segment-container"
      :slotPropsData="slotPropsData"
      :responseDataName="responseDataName"
      :scope="scope"
      :limit="limit"
      :clientPageLimit="clientPageLimit"
      :responsePageLimit="responsePageLimit"
      :isPaginationSimple="isPaginationSimple"
      :isReset="isReset"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <slot
          :[scope]="slotProps[scope]"
        ></slot>
      </template>
    </BasePaginatedSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseArtistSourceSelect
  from '*/components/models/artist/BaseArtistSourceSelect.vue'
import BaseRecommendationsFilters
  from '*/components/models/recommendations/BaseRecommendationsFilters.vue'
import BaseProfileLibrarySearchInput
  from '*/components/models/profile/library/BaseProfileLibrarySearchInput.vue'
import BaseViewChangeButtons
  from '*/components/buttons/BaseViewChangeButtons.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BasePaginatedPageContainer',
  components: {
    BaseSegmentContainer,
    BaseArtistSourceSelect,
    BaseRecommendationsFilters,
    BaseProfileLibrarySearchInput,
    BaseViewChangeButtons,
    BasePaginatedSegmentContainer
  },
  inject: {
    setViewIndex: {
      default: () => false
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    slotPropsData: Object,
    responseDataName: String,
    limit: Number,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isWithLibrarySearch: Boolean,
    isLibrarySearchClearable: Boolean,
    query: String,
    isWithArtistSelect: Boolean,
    isWithRecommendationsFilters: Boolean,
    filterScope: String,
    isWithViewChange: Boolean,
    viewIndex: Number,
    artistName: String,
    isPaginationSimple: Boolean,
    isReset: Boolean
  },
  emits: [
    'focus',
    'searchSubmit',
    'searchClear',
    'filterScopeChange',
    'filterValueChange'
  ],
  watch: {
    viewIndex: 'handleViewIndexChange',
    query: 'handleQueryChange'
  },
  methods: {
    handleArtistDataChange () {
      this.reset()
    },
    handleViewButtonClick (value) {
      this.setViewIndex(value)

      this.reset()
    },
    handleViewIndexChange () {
      this.slotPropsData.fetchData()
    },
    handleQueryChange () {
      this.reset()
    },
    handleFocus () {
      window.scrollTo(0, 0)

      this.$emit('focus')
    },
    handleSearchSubmit (value) {
      this.$emit(
        'searchSubmit',
        value
      )
    },
    handleSearchClear () {
      this.$emit(
        'searchClear'
      )
    },
    handleFilterScopeChange (value) {
      this.$emit(
        'filterScopeChange',
        value
      )
    },
    handleFilterValueChange (value) {
      this.reset()

      this.$emit(
        'filterValueChange',
        value
      )
    },
    reset () {
      this.$refs.segment.reset()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-view-buttons-segment
  @extend .d-flex, .align-items-center
</style>
