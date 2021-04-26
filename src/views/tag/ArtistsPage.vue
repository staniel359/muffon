<template>
  <BaseTagPaginatedPageContainer
    pageNameKey="artists"
    scope="artists"
    :clientPageLimit="20"
    :responsePageLimit="21"
  >
    <template #default="slotProps">
      <BaseArtistsTableList
        :itemsInRow="4"
        :artists="slotProps.artists"
        isWithListenersCount
      />
    </template>
  </BaseTagPaginatedPageContainer>
</template>

<script>
import BaseTagPaginatedPageContainer
  from '@/containers/pages/tag/BaseTagPaginatedPageContainer.vue'
import BaseArtistsTableList from '@/lists/artists/BaseArtistsTableList.vue'

export default {
  name: 'ArtistsPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseArtistsTableList
  }
}
</script>

<style lang="sass" scoped></style>
