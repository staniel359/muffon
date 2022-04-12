<template>
  <BaseProfileLibraryAlbumPageContainer
    :profileId="profileId"
    :albumId="albumId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="libraryAlbumData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :artistName="pageSlotProps.artistName"
          ></slot>
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
