<template>
  <BaseProfileLibraryAlbumSegmentContainer
    ref="segment"
    :profileId="profileId"
    :albumId="albumId"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        responseDataName="libraryAlbumData"
        :slotPropsData="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :artistName="segmentSlotProps.artistName"
          ></slot>
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

export default {
  name: 'BaseProfileLibraryAlbumPaginatedSegmentContainer',
  components: {
    BaseProfileLibraryAlbumSegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    profileId: String,
    albumId: String,
    scope: String,
    limit: Number,
    headerLink: Object
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
