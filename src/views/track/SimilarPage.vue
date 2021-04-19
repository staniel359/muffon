<template>
  <BasePaginatedPageContainer
    pageNameKey="similar"
    scope="similar"
    :clientPageLimit="50"
    :responsePageLimit="50"
  >
    <template #default="pageSlotProps">
      <BaseTracksSimpleList
        :tracks="pageSlotProps.similar"
        :artistName="pageSlotProps.artistName"
        isWithArtistName
        isWithLength
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import BasePaginatedPageContainer
  from '@/containers/pages/track/BasePaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'SimilarPage',
  components: {
    BasePaginatedPageContainer,
    BaseTracksSimpleList
  }
}
</script>

<style lang="sass" scoped></style>
