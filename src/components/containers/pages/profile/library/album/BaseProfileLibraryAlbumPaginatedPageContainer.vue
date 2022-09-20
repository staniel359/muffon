<template>
  <BaseProfileLibraryAlbumPageContainer
    ref="page"
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.albumData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :artist-name="pageSlotProps.artistName"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfileLibraryAlbumPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPageContainer
  from './BaseProfileLibraryAlbumPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseProfileLibraryAlbumPaginatedPageContainer',
  components: {
    BaseProfileLibraryAlbumPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: String,
    libraryAlbumId: String,
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
