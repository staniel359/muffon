<template>
  <BaseProfileFavoritesPaginatedPageContainer
    model="favoriteArtist"
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
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-created
        is-favorite
        is-with-library-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '@/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ArtistsPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
    BaseArtistsSimpleList
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
        artistsLimits.simple.large,
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
