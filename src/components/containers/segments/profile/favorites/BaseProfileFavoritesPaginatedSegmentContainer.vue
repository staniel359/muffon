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
        :response-data="segmentSlotProps.favoritesData"
        :is-loading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
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
import paginatedSegmentMixin from '*/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseProfileFavoritesPaginatedSegmentContainer',
  components: {
    BaseProfileFavoritesSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    profileId: String,
    scope: String,
    limit: Number,
    headerLink: Object
  }
}
</script>

<style lang="sass" scoped></style>
