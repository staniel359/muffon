<template>
  <BaseProfileLibraryAlbumSegmentContainer
    ref="segment"
    :profileId="profileId"
    :albumId="albumId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :headerTextKey="headerTextKey"
    :formatHeaderLink="formatHeaderLink"
  >
    <template #default="segmentSlotProps">
      <BaseSegmentContainer
        class="segment-container"
        :isLoading="segmentSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          :isLoading="segmentSlotProps.isLoading"
          :error="segmentSlotProps.error"
          :responseData="segmentSlotProps.libraryAlbumData"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="segmentSlotProps.fetchData"
          @refresh="segmentSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot
              :[scope]="slotProps[scope]"
              :artistName="segmentSlotProps.artistName"
            ></slot>
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfileLibraryAlbumSegmentContainer>
</template>

<script>
import BaseProfileLibraryAlbumSegmentContainer
  from './BaseProfileLibraryAlbumSegmentContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseProfileLibraryAlbumPaginatedSegmentContainer',
  components: {
    BaseProfileLibraryAlbumSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  props: {
    profileId: String,
    albumId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.segment-container
  @extend .d-flex
</style>
