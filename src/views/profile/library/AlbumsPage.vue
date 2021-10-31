<template>
  <BaseProfileLibraryPaginatedPageContainer
    scope="albums"
    pageNameKey="albums"
    :profileId="profileId"
    :clientPageLimit="20"
    :responsePageLimit="20"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps.albums"
        :profileId="profileId"
        :itemsInRow="4"
        :isWithFavoriteOption="isWithFavoriteOption"
        isWithArtistName
        isWithTracksCount
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '@/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseAlbumsTableList from '@/lists/albums/BaseAlbumsTableList.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: String
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
