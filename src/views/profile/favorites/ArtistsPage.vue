<template>
  <BaseProfileFavoritesPaginatedPageContainer
    scope="artists"
    :profileId="profileId"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps.artists"
        :isWithDeleteOption="isWithDeleteOption"
        isFavorite
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '*/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'ArtistsPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
    BaseArtistsSimpleList
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
