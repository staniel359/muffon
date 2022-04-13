<template>
  <BaseProfileLibraryAlbumPageContainer
    :profile-id="profileId"
    :album-id="albumId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="libraryAlbumData"
        :slot-props-data="pageSlotProps"
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
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseProfileLibraryAlbumPaginatedPageContainer',
  components: {
    BaseProfileLibraryAlbumPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    profileId: String,
    albumId: String,
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>
