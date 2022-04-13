<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-delete-option="isWithDeleteOption"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-created
        is-link-to-library
        is-with-playlist-option
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '*/components/containers/segments/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileLibraryTracksLink
} from '*/helpers/formatters/links/profile/library'

export default {
  name: 'TracksSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    isWithFavoriteOption: Boolean,
    isWithDeleteOption: Boolean
  },
  data () {
    return {
      limit: 10,
      scope: 'tracks'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryTracksLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
