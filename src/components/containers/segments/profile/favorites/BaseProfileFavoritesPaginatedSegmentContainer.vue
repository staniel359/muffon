<template>
  <BaseProfileFavoritesSegmentContainer
    ref="segment"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        response-data-name="favoritesData"
        :slot-props-data="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseProfileFavoritesSegmentContainer>
</template>

<script>
import BaseProfileFavoritesSegmentContainer
  from './BaseProfileFavoritesSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BaseProfileFavoritesPaginatedSegmentContainer',
  components: {
    BaseProfileFavoritesSegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    profileId: String,
    scope: String,
    limit: Number,
    headerLink: Object
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
