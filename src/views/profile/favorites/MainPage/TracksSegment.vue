<template>
  <BaseProfileFavoritesPaginatedSegmentContainer
    scope="tracks"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :isWithPlaylistOption="isWithPlaylistOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWithImage
        isWithArtistName
        isWithAlbumTitle
        isFavorite
      />
    </template>
  </BaseProfileFavoritesPaginatedSegmentContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedSegmentContainer
  from '*/components/containers/segments/profile/favorites/BaseProfileFavoritesPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileFavoriteTracksLink
} from '*/helpers/formatters/links/profile/favorites'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'TracksSegment',
  components: {
    BaseProfileFavoritesPaginatedSegmentContainer,
    BaseTracksSimpleList
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
    isWithPlaylistOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    headerLink () {
      return formatProfileFavoriteTracksLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
