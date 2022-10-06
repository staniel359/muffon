<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
    :scope="scope"
    :limit="limit"
    :view-index="viewIndex"
    is-with-top-segment
    is-with-view-change
  >
    <template #default="slotProps">
      <BaseAlbumsList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="slotProps.artistName"
        :top-tracks-count="slotProps.topTracksCount"
        :view-index="viewIndex"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-library
        is-link-to-library
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '@/components/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryArtistPaginatedPageContainer,
    BaseAlbumsList
  },
  mixins: [
    viewChangeMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryArtistId: String
  },
  data () {
    return {
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
