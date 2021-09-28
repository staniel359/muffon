<template>
  <BaseTopPaginatedPageContainer
    scope="tracks"
    :clientPageLimit="50"
    :responsePageLimit="50"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        isWithArtistName
        isWithLibraryLink
        isWithFavoriteButton
        isWithBookmarkButton
        isWithListenedButton
      />
    </template>
  </BaseTopPaginatedPageContainer>
</template>

<script>
import BaseTopPaginatedPageContainer
  from '@/containers/pages/top/BaseTopPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BaseTopPaginatedPageContainer,
    BaseTracksSimpleList
  }
}
</script>

<style lang="sass" scoped></style>
