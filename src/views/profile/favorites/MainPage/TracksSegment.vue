<template>
  <BaseProfileFavoritesPaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :is-with-playlist-option="isWithPlaylistOption"
        :is-with-delete-option="isWithDeleteOption"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-favorite
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
import {
  isCurrentProfile
} from '*/helpers/utils'

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
      limit: 10,
      scope: 'tracks'
    }
  },
  computed: {
    isWithPlaylistOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    headerLink () {
      return formatProfileFavoriteTracksLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
