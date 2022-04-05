<template>
  <BaseProfileLibraryPageContainer
    ref="pageContainer"
    :profileId="profileId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :query="query"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer
          class="search-view-buttons-segment"
        >
          <BaseProfileLibrarySearchInput
            v-if="isWithSearch"
            :isClearable="isSearchClearable"
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

        <BaseSegmentContainer
          class="main-paginated-page-segment-container"
          :isLoading="pageSlotProps.isLoading"
        >
          <BasePaginatedListContainer
            ref="paginatedContainer"
            :isLoading="pageSlotProps.isLoading"
            :error="pageSlotProps.error"
            :responseData="pageSlotProps.libraryData"
            :scope="scope"
            :clientPageLimit="clientPageLimit"
            :responsePageLimit="responsePageLimit"
            @focus="handleFocus"
            @fetchData="pageSlotProps.fetchData"
            @refresh="pageSlotProps.handleRefresh"
          >
            <template #default="slotProps">
              <slot
                :[scope]="slotProps[scope]"
                :topTracksCount="pageSlotProps.topTracksCount"
                :topAlbumsCount="pageSlotProps.topAlbumsCount"
              ></slot>
            </template>
          </BasePaginatedListContainer>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseProfileLibraryPageContainer>
</template>

<script>
import BaseProfileLibraryPageContainer
  from './BaseProfileLibraryPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibrarySearchInput
  from '*/components/models/profile/library/BaseProfileLibrarySearchInput.vue'
import BaseViewChangeButtons
  from '*/components/buttons/BaseViewChangeButtons.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BaseSegmentContainer,
    BaseProfileLibrarySearchInput,
    BaseViewChangeButtons,
    BasePaginatedListContainer
  },
  props: {
    profileId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number,
    isWithSearch: Boolean
  },
  emits: [
    'viewButtonClick'
  ],
  data () {
    return {
      query: ''
    }
  },
  computed: {
    isSearchClearable () {
      return !!this.query.length
    }
  },
  watch: {
    query: 'handleQueryChange'
  },
  methods: {
    handleViewButtonClick (index) {
      this.resetPagination()

      this.$emit(
        'viewButtonClick',
        index
      )

      this.$nextTick(() => {
        this.$refs.pageContainer.fetchData()
      })
    },
    handleFocus () {
      window.scrollTo(0, 0)
    },
    handleSearchSubmit (value) {
      this.query = value
    },
    handleSearchClear () {
      this.query = ''
    },
    handleQueryChange () {
      this.resetPagination()
    },
    resetPagination () {
      this.$refs.paginatedContainer.reset()
    }
  }
}
</script>

<style lang="sass" scoped>
.search-view-buttons-segment
  @extend .d-flex, .align-items-center
</style>
