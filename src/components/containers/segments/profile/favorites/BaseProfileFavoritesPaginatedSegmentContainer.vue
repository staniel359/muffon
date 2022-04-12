<template>
  <BaseProfileFavoritesSegmentContainer
    ref="segment"
    :profileId="profileId"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        responseDataName="favoritesData"
        :slotPropsData="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          ></slot>
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
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
