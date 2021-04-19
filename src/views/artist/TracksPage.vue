<template>
  <BasePaginatedPageContainer
    pageNameKey="tracks"
    scope="tracks"
    :clientPageLimit="50"
    :responsePageLimit="50"
  >
    <template #default="pageSlotProps">
      <BaseTracksSimpleList
        :tracks="pageSlotProps.tracks"
        :artistName="pageSlotProps.artistName"
        :topTrackCount="pageSlotProps.topTrackCount"
        isWithListenersCount
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import BasePaginatedPageContainer
  from '@/containers/pages/artist/BasePaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BasePaginatedPageContainer,
    BaseTracksSimpleList
  }
}
</script>

<style lang="sass" scoped></style>
