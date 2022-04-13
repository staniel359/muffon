<template>
  <BaseProfileFavoritesPaginatedPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        :is-with-delete-option="isWithDeleteOption"
        is-with-artist-name
        is-favorite
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '*/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

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
      limit: 50,
      scope: 'albums'
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
