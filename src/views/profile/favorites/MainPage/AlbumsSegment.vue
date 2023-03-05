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
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-artist-name
        is-with-source
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
import BaseAlbumsSimpleList
  from '@/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  albums as formatProfileFavoriteAlbumsLink
} from '@/helpers/formatters/links/profile/favorites'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileFavoritesPaginatedSegmentContainer,
    BaseAlbumsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 5,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatProfileFavoriteAlbumsLink(
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
