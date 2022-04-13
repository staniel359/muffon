<template>
  <BaseProfileLibraryPaginatedPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :items-in-row="itemsInRow"
        :is-with-favorite-option="isWithFavoriteOption"
        is-with-artist-name
        is-with-library
        is-link-to-library
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '*/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

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
      limit: 20,
      itemsInRow: 4,
      scope: 'albums'
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
