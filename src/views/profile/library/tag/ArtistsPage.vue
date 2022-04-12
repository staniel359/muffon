<template>
  <BaseProfileLibraryTagPaginatedPageContainer
    :profileId="profileId"
    :tagId="tagId"
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
  </BaseProfileLibraryTagPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryTagPaginatedPageContainer
  from '*/components/containers/pages/profile/library/tag/BaseProfileLibraryTagPaginatedPageContainer.vue'
import BaseArtistsList from '*/components/lists/artists/BaseArtistsList.vue'
import { isCurrentProfile } from '*/helpers/utils'
import viewChangeMixin from '*/mixins/viewChangeMixin'

export default {
  name: 'ArtistsPage',
  components: {
    BaseProfileLibraryTagPaginatedPageContainer,
    BaseArtistsList
  },
  mixins: [
    viewChangeMixin
  ],
  props: {
    profileId: String,
    tagId: String
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
