<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="similar"
    scope="similar"
    :clientPageLimit="10"
    :responsePageLimit="10"
  >
    <template #default="slotProps">
      <BaseArtistsExtendedList :artists="slotProps.similar" />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseArtistsExtendedList
  from '@/lists/artists/BaseArtistsExtendedList.vue'

export default {
  name: 'SimilarPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseArtistsExtendedList
  }
}
</script>

<style lang="sass" scoped></style>
