<template>
  <BaseProfileFavoritesPaginatedSegmentContainer
    scope="albums"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps.albums"
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
      limit: 5
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
