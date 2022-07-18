<template>
  <BaseProfileLibraryTrackPageContainer
    ref="page"
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.trackData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileLibraryTrackPageContainer>
</template>

<script>
import BaseProfileLibraryTrackPageContainer
  from './BaseProfileLibraryTrackPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '*/mixins/paginatedPageMixin'

export default {
  name: 'BaseProfileLibraryTrackPaginatedPageContainer',
  components: {
    BaseProfileLibraryTrackPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: String,
    libraryTrackId: String,
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
