<template>
  <BaseProfileLibraryPaginatedPageContainer
    scope="albums"
    :profileId="profileId"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    isWithSearch
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps.albums"
        :profileId="profileId"
        :itemsInRow="4"
        :isWithFavoriteOption="isWithFavoriteOption"
        isWithArtistName
        isWithLibrary
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '*/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 20
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
