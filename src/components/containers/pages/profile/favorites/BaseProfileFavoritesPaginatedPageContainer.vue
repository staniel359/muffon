<template>
  <BaseProfileFavoritesPageContainer
    :profileId="profileId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="favoritesData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          ></slot>
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileFavoritesPageContainer>
</template>

<script>
import BaseProfileFavoritesPageContainer from './BaseProfileFavoritesPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseProfileFavoritesPaginatedPageContainer',
  components: {
    BaseProfileFavoritesPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    profileId: String,
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
