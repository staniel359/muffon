<template>
  <BaseProfileLibraryTrackPaginatedSegmentContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :items-in-row="itemsInRow"
        :is-with-library-option="!isSelf"
        is-with-artist-name
        is-with-library
        is-link-to-library
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryTrackPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryTrackPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/track/BaseProfileLibraryTrackPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatProfileLibraryTrackAlbumsLink
} from '@/helpers/formatters/links/profile/library/track'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryTrackPaginatedSegmentContainer,
    BaseAlbumsTableList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTrackId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 3,
      itemsInRow: 3,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryTrackAlbumsLink(
        {
          profileId: this.profileId,
          libraryTrackId: this.libraryTrackId
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
