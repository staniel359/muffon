<template>
  <BaseProfileFavoritesPaginatedPageContainer
    model="favoriteVideo"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    :view-id="viewId"
    is-with-top-segment
    is-with-order-change
    is-with-view-change
  >
    <template
      #default="slotProps"
    >
      <BaseVideosList
        :videos="slotProps[scope]"
        :profile-id="profileId"
        :view-id="viewId"
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
import BaseVideosList from '@/components/lists/videos/BaseVideosList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'VideosPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
    BaseVideosList
  },
  mixins: [
    orderChangeMixin,
    viewChangeMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      viewId: 'simple',
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
