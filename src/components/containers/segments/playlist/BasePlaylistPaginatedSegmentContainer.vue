<template>
  <BasePlaylistSegmentContainer
    ref="segment"
    :profileId="profileId"
    :playlistId="playlistId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedListContainer
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
      </BasePaginatedListContainer>
    </template>
  </BasePlaylistSegmentContainer>
</template>

<script>
import BasePlaylistSegmentContainer from './BasePlaylistSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BasePlaylistPaginatedSegmentContainer',
  components: {
    BasePlaylistSegmentContainer,
    BasePaginatedListContainer
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
