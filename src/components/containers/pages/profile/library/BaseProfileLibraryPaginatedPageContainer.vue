<template>
  <BaseProfileLibraryPageContainer
    ref="pageContainer"
    :profileId="profileId"
    :scope="scope"
    :pageNameKey="pageNameKey"
    :responsePageLimit="responsePageLimit"
    :query="query"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer
          class="search-view-buttons-segment"
        >
          <SearchInput
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
          <BasePaginatedContainer
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
                :topTracksCount="pageSlotProps.libraryData.top_tracks_count"
                :topAlbumsCount="pageSlotProps.libraryData.top_albums_count"
                :profileId="pageSlotProps.profileId"
              ></slot>
            </template>
          </BasePaginatedContainer>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseProfileLibraryPageContainer>
</template>

<script>
import BaseProfileLibraryPageContainer
  from './BaseProfileLibraryPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import SearchInput
  from './BaseProfileLibraryPaginatedPageContainer/SearchInput.vue'
import BaseViewChangeButtons from '@/buttons/BaseViewChangeButtons.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BaseSegmentContainer,
    SearchInput,
    BaseViewChangeButtons,
    BasePaginatedContainer
  },
  props: {
    profileId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    pageNameKey: String,
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
