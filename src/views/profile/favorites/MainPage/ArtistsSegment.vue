<template>
  <BaseProfileFavoritesPaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :is-with-delete-option="isWithDeleteOption"
        is-favorite
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
      limit: 5,
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
