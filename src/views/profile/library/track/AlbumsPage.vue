<template>
  <BaseProfileLibraryTrackPaginatedPageContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
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
        :top-tracks-count="slotProps.topTracksCount"
        :view-index="viewIndex"
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
  from '@/components/containers/pages/profile/library/track/BaseProfileLibraryTrackPaginatedPageContainer.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryTrackPaginatedPageContainer,
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
    libraryTrackId: String
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
