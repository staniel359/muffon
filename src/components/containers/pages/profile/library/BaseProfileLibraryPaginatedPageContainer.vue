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
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
        :isLoading="pageSlotProps.isLoading"
      >
        <div class="search-view-buttons-container">
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
        </div>

        <BaseDivider
          v-if="isWithSearch || isWithViewChange"
        />

        <BasePaginatedContainer
          ref="paginatedContainer"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.libraryData"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          isReset
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
    </template>
  </BaseProfileLibraryPageContainer>
</template>

<script>
import BaseProfileLibraryPageContainer
  from './BaseProfileLibraryPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import SearchInput
  from './BaseProfileLibraryPaginatedPageContainer/SearchInput.vue'
import BaseViewChangeButtons from '@/BaseViewChangeButtons.vue'
import BaseDivider from '@/BaseDivider.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BaseSegmentContainer,
    SearchInput,
    BaseViewChangeButtons,
    BaseDivider,
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
  methods: {
    handleViewButtonClick (index) {
      this.$refs.paginatedContainer.reset()

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
    }
  }
}
</script>

<style lang="sass" scoped>
.main-paginated-page-segment-container
  @extend .flex-column

.search-view-buttons-container
  @extend .d-flex, .align-items-center
</style>
