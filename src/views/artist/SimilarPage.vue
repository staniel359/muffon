<template>
  <BasePaginatedPageContainer
    pageNameKey="similar"
    scope="similar"
    :clientPageLimit="10"
    :responsePageLimit="10"
  >
    <template #default="pageSlotProps">
      <BaseArtistsExtendedList :artists="pageSlotProps.similar" />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import BasePaginatedPageContainer
  from '@/containers/pages/artist/BasePaginatedPageContainer.vue'
import BaseArtistsExtendedList
  from '@/lists/artists/BaseArtistsExtendedList.vue'

export default {
  name: 'SimilarPage',
  components: {
    BasePaginatedPageContainer,
    BaseArtistsExtendedList
  }
}
</script>

<style lang="sass" scoped></style>
