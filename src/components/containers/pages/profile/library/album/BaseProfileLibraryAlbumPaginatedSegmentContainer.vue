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
        <BasePaginatedContainer
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
              :artistId="segmentSlotProps.artistId"
              :artistName="segmentSlotProps.artistName"
            ></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfileLibraryAlbumSegmentContainer>
</template>

<script>
import BaseProfileLibraryAlbumSegmentContainer
  from './BaseProfileLibraryAlbumSegmentContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseProfileLibraryAlbumPaginatedSegmentContainer',
  components: {
    BaseProfileLibraryAlbumSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
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
