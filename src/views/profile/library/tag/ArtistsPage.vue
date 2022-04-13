<template>
  <BaseProfileLibraryTagPaginatedPageContainer
    :profile-id="profileId"
    :tag-id="tagId"
    :scope="scope"
    :limit="limit"
    :view-index="viewIndex"
    is-with-view-change
    is-with-search
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
  </BaseProfileLibraryTagPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryTagPaginatedPageContainer
  from '*/components/containers/pages/profile/library/tag/BaseProfileLibraryTagPaginatedPageContainer.vue'
import BaseArtistsList from '*/components/lists/artists/BaseArtistsList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'
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
