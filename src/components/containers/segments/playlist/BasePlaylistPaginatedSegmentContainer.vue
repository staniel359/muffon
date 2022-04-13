<template>
  <BasePlaylistSegmentContainer
    ref="segment"
    :profile-id="profileId"
    :playlist-id="playlistId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedListContainer
        :response-data="segmentSlotProps.playlistData"
        :scope="scope"
        :limit="limit"
        :is-loading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        @fetch-data="segmentSlotProps.fetchData"
        @refresh="segmentSlotProps.refresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
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
    limit: Number
  },
  methods: {
    handleFocus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
