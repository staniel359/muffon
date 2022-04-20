<template>
  <BaseProfileLibraryPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :query="query"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        ref="page"
        response-data-name="libraryData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :is-with-view-change="isWithViewChange"
        :view-index="viewIndex"
        is-with-top-segment
        @search-submit="handleSearchSubmit"
        @search-clear="handleSearchClear"
      >
        <template #top>
          <BaseProfileLibrarySearchInput
            :is-clearable="isSearchClearable"
            :query="query"
            @submit="handleSearchSubmit"
            @clear="handleSearchClear"
          />
        </template>

        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :top-tracks-count="pageSlotProps.topTracksCount"
            :top-albums-count="pageSlotProps.topAlbumsCount"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileLibraryPageContainer>
</template>

<script>
import BaseProfileLibraryPageContainer
  from './BaseProfileLibraryPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseProfileLibrarySearchInput
  from '*/components/models/profile/library/BaseProfileLibrarySearchInput.vue'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BasePaginatedPageContainer,
    BaseProfileLibrarySearchInput
  },
  props: {
    profileId: String,
    scope: String,
    limit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number
  },
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
    handleSearchSubmit (
      value
    ) {
      this.query = value
    },
    handleSearchClear () {
      this.query = ''
    },
    handleQueryChange () {
      this.reset()
    },
    reset () {
      this.$refs
        .page
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
