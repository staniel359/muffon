<template>
  <BaseProfileLibraryTagPaginatedSegmentContainer
    :profile-id="profileId"
    :library-tag-id="libraryTagId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsTableList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :items-in-row="itemsInRow"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-link-to-library
        is-with-library
        is-with-created
        is-with-page-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileLibraryTagPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryTagPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/tag/BaseProfileLibraryTagPaginatedSegmentContainer.vue'
import BaseArtistsTableList
  from '@/components/lists/artists/BaseArtistsTableList.vue'
import {
  artists as formatProfileLibraryTagArtistsLink
} from '@/helpers/formatters/links/profile/library/tag'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseProfileLibraryTagPaginatedSegmentContainer,
    BaseArtistsTableList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTagId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 4,
      itemsInRow: 4,
      scope: 'artists'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryTagArtistsLink(
        {
          profileId: this.profileId,
          libraryTagId: this.libraryTagId
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
