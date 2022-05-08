<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="slotProps.artistName"
        :items-in-row="itemsInRow"
        :is-with-favorite-option="isSelf"
        is-with-library
        is-link-to-library
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '*/components/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryArtistPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: String,
    libraryArtistId: String
  },
  data () {
    return {
      limit: 20,
      itemsInRow: 4,
      scope: 'albums'
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
