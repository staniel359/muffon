<template>
  <BaseProfileLibraryAlbumSegmentContainer
    ref="segment"
    :profile-id="profileId"
    :album-id="albumId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        response-data-name="libraryAlbumData"
        :slot-props-data="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :artist-name="segmentSlotProps.artistName"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseProfileLibraryAlbumSegmentContainer>
</template>

<script>
import BaseProfileLibraryAlbumSegmentContainer
  from './BaseProfileLibraryAlbumSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '*/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseProfileLibraryAlbumPaginatedSegmentContainer',
  components: {
    BaseProfileLibraryAlbumSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    profileId: String,
    albumId: String,
    scope: String,
    limit: Number,
    headerLink: Object
  }
}
</script>

<style lang="sass" scoped></style>
