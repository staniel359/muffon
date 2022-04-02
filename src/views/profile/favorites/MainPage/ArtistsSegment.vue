<template>
  <BaseProfileFavoritesPaginatedSegmentContainer
    scope="artists"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps.artists"
        :isWithDeleteOption="isWithDeleteOption"
        isFavorite
      />
    </template>
  </BaseProfileFavoritesPaginatedSegmentContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedSegmentContainer
  from '*/components/containers/segments/profile/favorites/BaseProfileFavoritesPaginatedSegmentContainer.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  artists as formatProfileFavoriteArtistsLink
} from '*/helpers/formatters/links/profile/favorites'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseProfileFavoritesPaginatedSegmentContainer,
    BaseArtistsSimpleList
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
      return formatProfileFavoriteArtistsLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
