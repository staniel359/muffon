<template>
  <BaseProfileFavoritesPaginatedPageContainer
    :key="refreshKey"
    model="favoriteTrack"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-top-second-segment
    is-with-play-button
    is-with-order-change
    is-with-reload-button
  >
    <template
      #topPlayButton
    >
      <BaseProfileFavoritesTracksPlayButton
        :profile-id="profileId"
        :order="order"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-source
        is-with-created
        is-favorite
        is-with-source-option
        is-with-library-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-queue-option
        is-with-save-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseProfileFavoritesPaginatedPageContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedPageContainer
  from '@/components/containers/pages/profile/favorites/BaseProfileFavoritesPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseProfileFavoritesTracksPlayButton
  from '@/components/buttons/play/profile/favorites/BaseProfileFavoritesTracksPlayButton.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'TracksPage',
  components: {
    BaseProfileFavoritesPaginatedPageContainer,
    BaseTracksSimpleList,
    BaseProfileFavoritesTracksPlayButton
  },
  mixins: [
    orderChangeMixin,
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
      limit:
        tracksLimits.simple.large,
      scope: 'tracks',
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
