<template>
  <BaseTrackPaginatedPageContainer
    pageNameKey="similar"
    scope="similar"
    :clientPageLimit="50"
    :responsePageLimit="50"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.similar"
        :artistName="slotProps.artistName"
        :profileId="slotProps.profileId"
        isWithArtistName
        isWithDuration
        isWithLibraryLink
        isWithListenedButton
        isWithBookmarkButton
        isWithFavoriteButton
      />
    </template>
  </BaseTrackPaginatedPageContainer>
</template>

<script>
import BaseTrackPaginatedPageContainer
  from '@/containers/pages/track/BaseTrackPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'SimilarPage',
  components: {
    BaseTrackPaginatedPageContainer,
    BaseTracksSimpleList
  }
}
</script>

<style lang="sass" scoped></style>
