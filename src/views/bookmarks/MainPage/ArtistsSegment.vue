<template>
  <BaseBookmarksPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        is-with-created
        is-bookmark
        is-with-library-option
        is-with-favorite-option
        is-with-listened-option
        is-with-share-option
        is-with-delete-option
      />
    </template>
  </BaseBookmarksPaginatedSegmentContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseBookmarksPaginatedSegmentContainer
  from '@/components/containers/segments/bookmarks/BaseBookmarksPaginatedSegmentContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  artists as formatBookmarkArtistsLink
} from '@/helpers/formatters/links/bookmarks'

export default {
  name: 'ArtistsSegment',
  components: {
    BaseBookmarksPaginatedSegmentContainer,
    BaseArtistsSimpleList
  },
  data () {
    return {
      limit: 5,
      scope: 'artists'
    }
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    headerLink () {
      return formatBookmarkArtistsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
