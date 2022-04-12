<template>
  <BaseProfileLibraryTagPageContainer
    :profileId="profileId"
    :tagId="tagId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="libraryTagData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :isWithViewChange="isWithViewChange"
        :viewIndex="viewIndex"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :topTracksCount="pageSlotProps.topTracksCount"
            :topAlbumsCount="pageSlotProps.topAlbumsCount"
          ></slot>
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileLibraryTagPageContainer>
</template>

<script>
import BaseProfileLibraryTagPageContainer
  from './BaseProfileLibraryTagPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseProfileLibraryTagPaginatedPageContainer',
  components: {
    BaseProfileLibraryTagPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    profileId: String,
    tagId: String,
    scope: String,
    limit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number
  }
}
</script>

<style lang="sass" scoped></style>
