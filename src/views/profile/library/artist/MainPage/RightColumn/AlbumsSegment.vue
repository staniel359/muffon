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
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :artist-name="slotProps.artistName"
        :items-in-row="itemsInRow"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-library
        is-link-to-library
        is-with-created
        is-with-page-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryArtistPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/artist/BaseProfileLibraryArtistPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink
} from '@/helpers/formatters/links/profile/library/artist'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryArtistPaginatedSegmentContainer,
    BaseAlbumsTableList
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
        albumsLimits.table.extrasmall,
      itemsInRow:
        albumsLimits.table.extrasmall,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryArtistAlbumsLink(
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
