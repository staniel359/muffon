<template>
  <BaseProfileLibraryArtistSegmentContainer
    ref="segment"
    :profileId="profileId"
    :artistId="artistId"
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
          :responseData="segmentSlotProps.libraryArtistData"
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
            ></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfileLibraryArtistSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistSegmentContainer
  from './BaseProfileLibraryArtistSegmentContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseProfileLibraryArtistPaginatedSegmentContainer',
  components: {
    BaseProfileLibraryArtistSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    profileId: String,
    artistId: String,
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
