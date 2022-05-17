<template>
  <BaseProfileLibraryPageContainer
    ref="page"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :query="query"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        ref="pagination"
        response-data-name="libraryData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :is-with-top-segment="isWithTopSegment"
        :is-with-view-change="isWithViewChange"
        :view-index="viewIndex"
      >
        <template #top>
          <BaseProfileLibrarySearchInput
            v-if="isWithSearch"
            :query="query"
            :is-with-clear-button="isWithClearButton"
            @clear-button-click="handleClearButtonClick"
            @submit="handleSearchSubmit"
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
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BasePaginatedPageContainer,
    BaseProfileLibrarySearchInput
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: String,
    scope: String,
    limit: Number,
    isWithTopSegment: Boolean,
    isWithSearch: Boolean,
    isWithViewChange: Boolean,
    viewIndex: Number
  },
  data () {
    return {
      query: ''
    }
  },
  computed: {
    isWithClearButton () {
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
    handleClearButtonClick () {
      this.query = ''
    },
    handleQueryChange () {
      this.reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
