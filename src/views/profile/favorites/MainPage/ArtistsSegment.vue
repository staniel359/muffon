<template>
  <BaseProfileFavoritesPaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-created
        is-favorite
        is-with-library-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileFavoritesPaginatedSegmentContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedSegmentContainer
  from '@/components/containers/segments/profile/favorites/BaseProfileFavoritesPaginatedSegmentContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  artists as formatProfileFavoriteArtistsLink
} from '@/helpers/formatters/links/profile/favorites'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

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
    }
  },
  data () {
    return {
      limit:
        artistsLimits.simple.small,
      scope: 'artists'
    }
  },
  computed: {
    headerLink () {
      return formatProfileFavoriteArtistsLink(
        {
          profileId: this.profileId
        }
      )
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
