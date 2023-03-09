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
      <BaseVideosSimpleList
        :videos="slotProps[scope]"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-channel-title
        is-with-created
        is-favorite
        is-with-watched-option
        is-with-share-option
      />
    </template>
  </BaseProfileFavoritesPaginatedSegmentContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedSegmentContainer
  from '@/components/containers/segments/profile/favorites/BaseProfileFavoritesPaginatedSegmentContainer.vue'
import BaseVideosSimpleList
  from '@/components/lists/videos/BaseVideosSimpleList.vue'
import {
  videos as formatProfileFavoriteVideosLink
} from '@/helpers/formatters/links/profile/favorites'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  videos as videosLimits
} from '@/helpers/data/limits'

export default {
  name: 'VideosSegment',
  components: {
    BaseProfileFavoritesPaginatedSegmentContainer,
    BaseVideosSimpleList
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
        videosLimits.simple.small,
      scope: 'videos'
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    headerLink () {
      return formatProfileFavoriteVideosLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
