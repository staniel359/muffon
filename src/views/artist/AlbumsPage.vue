<template>
  <BasePaginatedPageContainer
    pageNameKey="albums"
    scope="albums"
    :clientPageLimit="20"
    :responsePageLimit="20"
  >
    <template #default="pageSlotProps">
      <BaseAlbumsTableList
        :itemsInRow="4"
        :albums="pageSlotProps.albums"
        :artistName="pageSlotProps.artistName"
        :isSegmentLoading="pageSlotProps.isLoading"
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import BasePaginatedPageContainer
  from '@/containers/pages/artist/BasePaginatedPageContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'

export default {
  name: 'AlbumsPage',
  components: {
    BasePaginatedPageContainer,
    BaseAlbumsTableList
  }
}
</script>

<style lang="sass" scoped></style>
