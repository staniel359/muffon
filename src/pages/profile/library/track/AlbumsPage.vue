<template>
  <BaseProfileLibraryTrackPaginatedPageContainer
    :key="refreshKey"
    model="libraryAlbum"
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
    :scope="scope"
    :limit="limit"
    :order="order"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
    is-with-order-change
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :top-tracks-count="slotProps.topTracksCount"
        :view-id="viewId"
        :is-with-library-option="!isSelf"
        is-with-artist-name
        is-with-library
        is-link-to-library
        is-with-source
        is-with-created
        is-with-page-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
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
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryTrackPaginatedPageContainer,
    BaseAlbumsList
  },
  mixins: [
    viewChangeMixin,
    orderChangeMixin,
    pageMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    },
    libraryTrackId: Number
  },
  data () {
    return {
      scope: 'albums',
      order: 'libraryTracksCountDesc'
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
