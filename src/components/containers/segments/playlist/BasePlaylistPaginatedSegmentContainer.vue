<template>
  <BasePlaylistSegmentContainer
    ref="segment"
    :profileId="profileId"
    :playlistId="playlistId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedListContainer
        :responseData="segmentSlotProps.playlistData"
        :scope="scope"
        :limit="limit"
        :isLoading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        @fetchData="segmentSlotProps.fetchData"
        @refresh="segmentSlotProps.refresh"
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
    limit: Number
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
