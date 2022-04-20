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
        :artist-name="artistName"
        @artist-data-change="handleArtistDataChange"
      />
    </BaseSegmentContainer>

    <BaseSegmentContainer
      v-if="isWithFilter"
    >
      <slot
        name="filter"
      />
    </BaseSegmentContainer>

    <BaseSegmentContainer
      v-if="isWithViewChange || isWithLibrarySearch"
      class="search-view-buttons-segment"
    >
      <BaseProfileLibrarySearchInput
        v-if="isWithLibrarySearch"
        :is-clearable="isLibrarySearchClearable"
        :query="query"
        @submit="handleSearchSubmit"
        @clear="handleSearchClear"
      />

      <BaseViewChangeButtons
        v-if="isWithViewChange"
        :view-index="viewIndex"
        @view-button-click="handleViewButtonClick"
      />
    </BaseSegmentContainer>

    <BasePaginatedSegmentContainer
      ref="segment"
      class="main-paginated-page-segment-container"
      :slot-props-data="slotPropsData"
      :response-data-name="responseDataName"
      :scope="scope"
      :limit="limit"
      :client-page-limit="clientPageLimit"
      :response-page-limit="responsePageLimit"
      :is-pagination-simple="isPaginationSimple"
      :is-reset="isReset"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </BasePaginatedSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseArtistSourceSelect
  from '*/components/models/artist/BaseArtistSourceSelect.vue'
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
    isWithFilter: Boolean,
    isWithViewChange: Boolean,
    viewIndex: Number,
    artistName: String,
    isPaginationSimple: Boolean,
    isReset: Boolean
  },
  emits: [
    'focus',
    'searchSubmit',
    'searchClear'
  ],
  watch: {
    viewIndex: 'handleViewIndexChange',
    query: 'handleQueryChange'
  },
  methods: {
    handleArtistDataChange () {
      this.reset()
    },
    handleViewButtonClick (
      value
    ) {
      this.setViewIndex(
        value
      )

      this.reset()
    },
    handleViewIndexChange () {
      this.slotPropsData.fetchData()
    },
    handleQueryChange () {
      this.reset()
    },
    handleFocus () {
      window.scrollTo(
        0,
        0
      )

      this.$emit(
        'focus'
      )
    },
    handleSearchSubmit (
      value
    ) {
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
    reset () {
      this.$refs
        .segment
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-view-buttons-segment
  @extend .d-flex, .align-items-center
</style>
