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
        <BasePaginatedContainer
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
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfileLibraryAlbumPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPageContainer
  from './BaseProfileLibraryAlbumPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseProfileLibraryAlbumPaginatedPageContainer',
  components: {
    BaseProfileLibraryAlbumPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
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

<style lang="sass" scoped>
.main-paginated-page-segment-container
  @extend .flex-column
</style>
