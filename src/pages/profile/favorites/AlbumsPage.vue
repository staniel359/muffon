<template>
  <BaseProfileFavoritesPaginatedPageContainer
    :key="refreshKey"
    model="favoriteAlbum"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    :view-id="viewId"
    is-with-top-segment
    is-with-order-change
    is-with-view-change
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :view-id="viewId"
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
        is-with-external-link-option
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '@/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
    BaseAlbumsList
  },
  mixins: [
    orderChangeMixin,
    viewChangeMixin,
    pageMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      viewId: 'simple',
      scope: 'albums',
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
