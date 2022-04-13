<template>
  <BaseProfileLibraryPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :query="query"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="libraryData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :is-with-view-change="isWithViewChange"
        :view-index="viewIndex"
        :is-library-search-clearable="isSearchClearable"
        :query="query"
        is-with-library-search
        @search-submit="handleSearchSubmit"
        @search-clear="handleSearchClear"
      >
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

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BasePaginatedPageContainer
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
  methods: {
    handleSearchSubmit (
      value
    ) {
      this.query = value
    },
    handleSearchClear () {
      this.query = ''
    }
  }
}
</script>

<style lang="sass" scoped></style>
