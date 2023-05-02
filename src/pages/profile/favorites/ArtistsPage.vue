<template>
  <BaseProfileFavoritesPaginatedPageContainer
    model="favoriteArtist"
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
      <BaseArtistsList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :view-id="viewId"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-created
        is-favorite
        is-with-library-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '@/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseArtistsList from '@/components/lists/artists/BaseArtistsList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import viewChangeMixin from '@/mixins/viewChangeMixin'

export default {
  name: 'ArtistsPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
    BaseArtistsList
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
      scope: 'artists',
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
