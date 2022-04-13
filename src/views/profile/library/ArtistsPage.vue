<template>
  <BaseProfileLibraryPaginatedPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :view-index="viewIndex"
    is-with-view-change
  >
    <template #default="slotProps">
      <BaseArtistsList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :top-tracks-count="slotProps.topTracksCount"
        :top-albums-count="slotProps.topAlbumsCount"
        :view-index="viewIndex"
        :is-with-favorite-option="isWithFavoriteOption"
        is-with-library
        is-link-to-library
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '*/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseArtistsList from '*/components/lists/artists/BaseArtistsList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'
import viewChangeMixin from '*/mixins/viewChangeMixin'

export default {
  name: 'ArtistsPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseArtistsList
  },
  mixins: [
    viewChangeMixin
  ],
  props: {
    profileId: String
  },
  data () {
    return {
      scope: 'artists'
    }
  },
  computed: {
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
