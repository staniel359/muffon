<template>
  <BaseProfileLibraryTagPageContainer
    ref="pageContainer"
    :profileId="profileId"
    :tagId="tagId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
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
            :responseData="pageSlotProps.libraryTagData"
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
  </BaseProfileLibraryTagPageContainer>
</template>

<script>
import BaseProfileLibraryTagPageContainer
  from './BaseProfileLibraryTagPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseViewChangeButtons
  from '*/components/buttons/BaseViewChangeButtons.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseProfileLibraryTagPaginatedPageContainer',
  components: {
    BaseProfileLibraryTagPageContainer,
    BaseSegmentContainer,
    BaseViewChangeButtons,
    BasePaginatedListContainer
  },
  props: {
    profileId: String,
    tagId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number
  },
  emits: [
    'viewButtonClick'
  ],
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    },
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
