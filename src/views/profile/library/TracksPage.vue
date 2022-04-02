<template>
  <BaseProfileLibraryPaginatedPageContainer
    scope="tracks"
    :profileId="profileId"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    isWithSearch
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithImage
        isWithArtistName
        isWithAlbumTitle
        isWithCreated
        isLinkToLibrary
        isWithPlaylistOption
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '*/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'TracksPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 50
    }
  },
  computed: {
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
