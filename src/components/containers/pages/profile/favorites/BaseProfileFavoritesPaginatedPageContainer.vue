<template>
  <BaseProfileFavoritesPageContainer
    ref="page"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.favoritesData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-top-second-segment="isWithTopSecondSegment"
        :is-with-play-button="isWithPlayButton"
        :is-with-order-change="isWithOrderChange"
        :is-with-view-change="isWithViewChange"
        :is-with-reload-button="isWithReloadButton"
        :view-id="viewId"
      >
        <template
          #topPlayButton
        >
          <slot
            name="topPlayButton"
          />
        </template>

        <template
          #default="slotProps"
        >
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileFavoritesPageContainer>
</template>

<script>
import BaseProfileFavoritesPageContainer from './BaseProfileFavoritesPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseProfileFavoritesPaginatedPageContainer',
  components: {
    BaseProfileFavoritesPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: Number,
    scope: String,
    limit: Number,
    order: String,
    model: String,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean,
    isWithViewChange: Boolean,
    isWithReloadButton: Boolean,
    viewId: String
  }
}
</script>

<style lang="sass" scoped></style>
