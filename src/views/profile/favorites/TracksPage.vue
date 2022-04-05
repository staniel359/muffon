<template>
  <BaseProfileFavoritesPaginatedPageContainer
    scope="tracks"
    :profileId="profileId"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :isWithPlaylistOption="isWithPlaylistOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithImage
        isWithArtistName
        isWithAlbumTitle
        isFavorite
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '*/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'TracksPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
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
    isWithPlaylistOption () {
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
