<template>
  <BasePaginatedPageContainer
    pageNameKey="artists"
    scope="artists"
    :clientPageLimit="20"
    :responsePageLimit="21"
  >
    <template #default="pageSlotProps">
      <BaseArtistsTableList
        :itemsInRow="4"
        :artists="pageSlotProps.artists"
        isWithListenersCount
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import BasePaginatedPageContainer
  from '@/containers/pages/tag/BasePaginatedPageContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'

export default {
  name: 'ArtistsPage',
  components: {
    BasePaginatedPageContainer,
    BaseArtistsTableList
  }
}
</script>

<style lang="sass" scoped></style>
