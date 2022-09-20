<template>
  <BaseProfileLibraryPaginatedPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :view-index="viewIndex"
    is-with-top-segment
    is-with-search
    is-with-view-change
  >
    <template #default="slotProps">
      <BaseArtistsList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :top-tracks-count="slotProps.topTracksCount"
        :top-albums-count="slotProps.topAlbumsCount"
        :view-index="viewIndex"
        :is-with-library-option="!isSelf"
        is-with-library
        is-link-to-library
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '@/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseArtistsList from '@/components/lists/artists/BaseArtistsList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import viewChangeMixin from '@/mixins/viewChangeMixin'

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
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      scope: 'artists'
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
