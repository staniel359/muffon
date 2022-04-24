<template>
  <BaseProfileLibraryArtistSegmentContainer
    ref="segment"
    :profile-id="profileId"
    :artist-id="artistId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        response-data-name="libraryArtistData"
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
  </BaseProfileLibraryArtistSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistSegmentContainer
  from './BaseProfileLibraryArtistSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '*/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseProfileLibraryArtistPaginatedSegmentContainer',
  components: {
    BaseProfileLibraryArtistSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    profileId: String,
    artistId: String,
    scope: String,
    limit: Number,
    headerLink: Object
  }
}
</script>

<style lang="sass" scoped></style>
