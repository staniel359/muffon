<template>
  <BaseProfileLibraryPaginatedPageContainer
    :profileId="profileId"
    :scope="scope"
    :limit="limit"
    :viewIndex="viewIndex"
    isWithViewChange
    isWithSearch
  >
    <template #default="slotProps">
      <BaseArtistsList
        :artists="slotProps[scope]"
        :profileId="profileId"
        :topTracksCount="slotProps.topTracksCount"
        :topAlbumsCount="slotProps.topAlbumsCount"
        :viewIndex="viewIndex"
        :isWithFavoriteOption="isWithFavoriteOption"
        isWithLibrary
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '*/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseArtistsList from '*/components/lists/artists/BaseArtistsList.vue'
import { isCurrentProfile } from '*/helpers/utils'
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
