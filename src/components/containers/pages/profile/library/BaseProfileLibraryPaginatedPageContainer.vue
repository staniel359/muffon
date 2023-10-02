<template>
  <BaseProfileLibraryPageContainer
    ref="page"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    :query="query"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.libraryData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-order-change="isWithOrderChange"
        :is-with-view-change="isWithViewChange"
        :view-id="viewId"
      >
        <template
          #top
        >
          <BaseSearchButton
            v-if="isWithSearch"
            :is-active="isShowSearch"
            @click="handleSearchButtonClick"
          />
        </template>

        <template
          #topExtra
        >
          <BaseProfileLibrarySearchInput
            v-if="isWithSearch"
            v-show="isShowSearch"
            class="main-bottom-section"
            :is-show="isShowSearch"
            :query="query"
            :is-with-clear-button="isWithClearButton"
            @submit="handleSearchSubmit"
            @clear-button-click="handleSearchClearButtonClick"
          />
        </template>

        <template
          #default="slotProps"
        >
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
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import BaseProfileLibrarySearchInput
  from '@/components/models/profile/library/BaseProfileLibrarySearchInput.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BasePaginatedPageContainer,
    BaseSearchButton,
    BaseProfileLibrarySearchInput
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: String,
    scope: String,
    limit: Number,
    order: String,
    model: String,
    isWithTopSegment: Boolean,
    isWithSearch: Boolean,
    isWithOrderChange: Boolean,
    isWithViewChange: Boolean,
    viewId: String
  },
  data () {
    return {
      isShowSearch: false,
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
    handleSearchButtonClick () {
      this.isShowSearch =
        !this.isShowSearch
    },
    handleSearchSubmit (
      value
    ) {
      this.query = value
    },
    handleSearchClearButtonClick () {
      this.query = ''
    },
    async handleQueryChange () {
      await this.$nextTick()

      this.refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
