<template>
  <BaseProfileFavoritesPaginatedPageContainer
    scope="albums"
    :profileId="profileId"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps.albums"
        :isWithDeleteOption="isWithDeleteOption"
        isWithArtistName
        isFavorite
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '*/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
    BaseAlbumsSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 50
    }
  },
  computed: {
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
