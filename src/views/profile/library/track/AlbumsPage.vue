<template>
  <BaseProfileLibraryTrackPaginatedPageContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :items-in-row="itemsInRow"
        :is-with-library-option="!isSelf"
        is-with-artist-name
        is-with-library
        is-link-to-library
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryTrackPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryTrackPaginatedPageContainer
  from '*/components/containers/pages/profile/library/track/BaseProfileLibraryTrackPaginatedPageContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryTrackPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTrackId: String
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
