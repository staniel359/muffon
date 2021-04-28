<template>
  <BaseTagPaginatedPageContainer
    pageNameKey="artists"
    scope="artists"
    :clientPageLimit="10"
    :responsePageLimit="21"
  >
    <template #default="slotProps">
      <BaseArtistsExtendedList
        :artists="slotProps.artists"
      />
    </template>
  </BaseTagPaginatedPageContainer>
</template>

<script>
import BaseTagPaginatedPageContainer
  from '@/containers/pages/tag/BaseTagPaginatedPageContainer.vue'
import BaseArtistsExtendedList from '@/lists/artists/BaseArtistsExtendedList.vue'

export default {
  name: 'ArtistsPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseArtistsExtendedList
  }
}
</script>

<style lang="sass" scoped></style>
