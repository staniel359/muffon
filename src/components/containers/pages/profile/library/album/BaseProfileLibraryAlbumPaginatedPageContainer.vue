<template>
  <BaseProfileLibraryAlbumPageContainer
    ref="pageContainer"
    :profileId="profileId"
    :albumId="albumId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :pageNameKey="pageNameKey"
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
        <BasePaginatedListContainer
          ref="paginatedContainer"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.libraryAlbumData"
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
              :artistId="pageSlotProps.artistId"
              :artistName="pageSlotProps.artistName"
            ></slot>
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfileLibraryAlbumPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPageContainer
  from './BaseProfileLibraryAlbumPageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseProfileLibraryAlbumPaginatedPageContainer',
  components: {
    BaseProfileLibraryAlbumPageContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  props: {
    profileId: String,
    albumId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    pageNameKey: String
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
