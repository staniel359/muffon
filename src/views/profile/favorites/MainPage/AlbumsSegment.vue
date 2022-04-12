<template>
  <BaseProfileFavoritesPaginatedSegmentContainer
    :profileId="profileId"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        :isWithDeleteOption="isWithDeleteOption"
        isWithArtistName
        isFavorite
      />
    </template>
  </BaseProfileFavoritesPaginatedSegmentContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedSegmentContainer
  from '*/components/containers/segments/profile/favorites/BaseProfileFavoritesPaginatedSegmentContainer.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  albums as formatProfileFavoriteAlbumsLink
} from '*/helpers/formatters/links/profile/favorites'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileFavoritesPaginatedSegmentContainer,
    BaseAlbumsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    isWithDeleteOption: Boolean
  },
  data () {
    return {
      limit: 5,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatProfileFavoriteAlbumsLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
