<template>
  <BaseProfileLibraryPageContainer
    :profileId="profileId"
    :scope="scope"
    :limit="limit"
    :query="query"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="libraryData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :isWithViewChange="isWithViewChange"
        :viewIndex="viewIndex"
        :isLibrarySearchClearable="isSearchClearable"
        :query="query"
        isWithLibrarySearch
        @searchSubmit="handleSearchSubmit"
        @searchClear="handleSearchClear"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :topTracksCount="pageSlotProps.topTracksCount"
            :topAlbumsCount="pageSlotProps.topAlbumsCount"
          ></slot>
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
    viewIndex: Number,
    isWithSearch: Boolean
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
    handleSearchSubmit (value) {
      this.query = value
    },
    handleSearchClear () {
      this.query = ''
    }
  }
}
</script>

<style lang="sass" scoped></style>
