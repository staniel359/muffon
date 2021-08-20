<template>
  <BaseProfileLibraryPageContainer
    ref="pageContainer"
    :profileId="profileId"
    :scope="scope"
    :pageNameKey="pageNameKey"
    :responsePageLimit="responsePageLimit"
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
        <BaseViewChangeButtons
          v-if="isWithViewChange"
          :viewIndex="viewIndex"
          @viewButtonClick="handleViewButtonClick"
        />

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
    </template>
  </BaseProfileLibraryPageContainer>
</template>

<script>
import BaseProfileLibraryPageContainer
  from './BaseProfileLibraryPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseViewChangeButtons from '@/BaseViewChangeButtons.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseProfileLibraryPaginatedPageContainer',
  components: {
    BaseProfileLibraryPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer,
    BaseViewChangeButtons
  },
  props: {
    profileId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    pageNameKey: String,
    isWithViewChange: Boolean,
    viewIndex: Number
  },
  emits: [
    'viewButtonClick'
  ],
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
    }
  }
}
</script>

<style lang="sass" scoped>
.main-paginated-page-segment-container
  @extend .flex-column
</style>
