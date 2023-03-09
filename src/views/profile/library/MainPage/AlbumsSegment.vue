<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    :profile-id="profileId"
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
        :items-in-row="itemsInRow"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-artist-name
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
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as formatProfileLibraryAlbumsLink
} from '@/helpers/formatters/links/profile/library'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseAlbumsTableList
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
        albumsLimits.table.small,
      itemsInRow: (
        albumsLimits.table.small / 2
      ),
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryAlbumsLink(
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
