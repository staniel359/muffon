<template>
  <BaseProfileLibraryTagPaginatedPageContainer
    model="libraryArtist"
    :profile-id="profileId"
    :library-tag-id="libraryTagId"
    :scope="scope"
    :limit="limit"
    :order="order"
    :view-id="viewId"
    is-with-top-segment
    is-with-search
    is-with-view-change
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :top-tracks-count="slotProps.topTracksCount"
        :top-albums-count="slotProps.topAlbumsCount"
        :view-id="viewId"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-library
        is-link-to-library
        is-with-created
        is-with-page-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryTagPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryTagPaginatedPageContainer
  from '@/components/containers/pages/profile/library/tag/BaseProfileLibraryTagPaginatedPageContainer.vue'
import BaseArtistsList from '@/components/lists/artists/BaseArtistsList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'ArtistsPage',
  components: {
    BaseProfileLibraryTagPaginatedPageContainer,
    BaseArtistsList
  },
  mixins: [
    viewChangeMixin,
    orderChangeMixin
  ],
  props: {
    profileId: String,
    libraryTagId: String
  },
  data () {
    return {
      scope: 'artists',
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
