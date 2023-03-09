<template>
  <BaseProfileLibraryArtistPaginatedSegmentContainer
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="slotProps.artistName"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-album-title
        is-with-source
        is-with-created
        is-link-to-library
        is-with-page-option
        is-with-source-option
        is-with-playlist-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-queue-option
      />
    </template>
  </BaseProfileLibraryArtistPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink
} from '@/helpers/formatters/links/profile/library/artist'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'TracksSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryArtistId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit:
        tracksLimits.simple.small,
      scope: 'tracks'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryArtistTracksLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
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
