<template>
  <BaseProfileLibraryTagPageContainer
    ref="page"
    :profile-id="profileId"
    :library-tag-id="libraryTagId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.tagData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :is-with-top-segment="isWithTopSegment"
        :is-with-view-change="isWithViewChange"
        :view-id="viewId"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :top-tracks-count="pageSlotProps.topTracksCount"
            :top-albums-count="pageSlotProps.topAlbumsCount"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileLibraryTagPageContainer>
</template>

<script>
import BaseProfileLibraryTagPageContainer
  from './BaseProfileLibraryTagPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseProfileLibraryTagPaginatedPageContainer',
  components: {
    BaseProfileLibraryTagPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: String,
    libraryTagId: String,
    scope: String,
    limit: Number,
    isWithTopSegment: Boolean,
    isWithViewChange: Boolean,
    viewId: String
  }
}
</script>

<style lang="sass" scoped></style>
