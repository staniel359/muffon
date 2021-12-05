<template>
  <BaseTagPaginatedPageContainer
    pageNameKey="tracks"
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="slotProps.profileId"
        isWithArtistName
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
        isWithPlaylistOption
      />
    </template>
  </BaseTagPaginatedPageContainer>
</template>

<script>
import BaseTagPaginatedPageContainer
  from '@/containers/pages/tag/BaseTagPaginatedPageContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseTracksSimpleList
  },
  data () {
    return {
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
