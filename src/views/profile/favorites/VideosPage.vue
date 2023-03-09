<template>
  <BaseProfileFavoritesPaginatedPageContainer
    model="favoriteVideo"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BaseVideosSimpleList
        :videos="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-channel-title
        is-with-created
        is-favorite
        is-with-watched-option
        is-with-share-option
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '@/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseVideosSimpleList
  from '@/components/lists/videos/BaseVideosSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  videos as videosLimits
} from '@/helpers/data/limits'

export default {
  name: 'VideosPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
    BaseVideosSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit:
        videosLimits.simple.large,
      scope: 'videos',
      order: 'createdDesc'
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
