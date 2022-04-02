<template>
  <BaseProfileFavoritesSegmentContainer
    ref="segment"
    :profileId="profileId"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BaseSegmentContainer
        class="segment-container"
        :isLoading="segmentSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          :isLoading="segmentSlotProps.isLoading"
          :error="segmentSlotProps.error"
          :responseData="segmentSlotProps.favoritesData"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="segmentSlotProps.fetchData"
          @refresh="segmentSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot :[scope]="slotProps[scope]"></slot>
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseProfileFavoritesSegmentContainer>
</template>

<script>
import BaseProfileFavoritesSegmentContainer
  from './BaseProfileFavoritesSegmentContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseProfileFavoritesPaginatedSegmentContainer',
  components: {
    BaseProfileFavoritesSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  props: {
    profileId: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    headerLink: Object
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
