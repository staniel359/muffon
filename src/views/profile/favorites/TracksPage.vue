<template>
  <BaseProfileFavoritesPaginatedPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :is-with-playlist-option="isWithPlaylistOption"
        :is-with-delete-option="isWithDeleteOption"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-favorite
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '*/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

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
      limit: 50,
      scope: 'tracks'
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
