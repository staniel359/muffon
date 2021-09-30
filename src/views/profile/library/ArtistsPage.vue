<template>
  <BaseProfileLibraryPaginatedPageContainer
    scope="artists"
    pageNameKey="artists"
    :profileId="profileId"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :viewIndex="viewIndex"
    isWithViewChange
    @viewButtonClick="handleViewButtonClick"
  >
    <template #default="slotProps">
      <BaseArtistsList
        :viewIndex="viewIndex"
        :artists="slotProps.artists"
        :topTracksCount="slotProps.topTracksCount"
        :topAlbumsCount="slotProps.topAlbumsCount"
        :profileId="slotProps.profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithTracksCount
        isWithAlbumsCount
        isWithLibrary
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '@/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseArtistsList from '@/lists/artists/BaseArtistsList.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'ArtistsPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseArtistsList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      viewIndex: 1,
      viewLimits: [50, 20, 10]
    }
  },
  computed: {
    limit () {
      return this.viewLimits[
        this.viewIndex
      ]
    },
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  methods: {
    handleViewButtonClick (index) {
      this.viewIndex = index
    }
  }
}
</script>

<style lang="sass" scoped></style>
