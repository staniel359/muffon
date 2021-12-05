<template>
  <BasePlaylistSegmentContainer
    ref="segment"
    :profileId="profileId"
    :playlistId="playlistId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedContainer
        :isLoading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        :responseData="segmentSlotProps.playlistData"
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
    </template>
  </BasePlaylistSegmentContainer>
</template>

<script>
import BasePlaylistSegmentContainer from './BasePlaylistSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BasePlaylistPaginatedSegmentContainer',
  components: {
    BasePlaylistSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    profileId: String,
    playlistId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number
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
