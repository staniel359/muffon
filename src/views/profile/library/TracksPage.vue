<template>
  <BaseProfileLibraryPaginatedPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-delete-option="isWithDeleteOption"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-created
        is-link-to-library
        is-with-playlist-option
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '*/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

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
      limit: 50,
      scope: 'tracks'
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
