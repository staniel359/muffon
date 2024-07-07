<template>
  <BaseProfileLibraryArtistPaginatedPageContainer
    :key="refreshKey"
    model="libraryTrack"
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
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
      <BaseProfileLibraryArtistTracksPlayButton
        :profile-id="profileId"
        :library-artist-id="libraryArtistId"
        :order="order"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-album-title
        is-with-source
        is-with-created
        is-link-to-library
        is-with-page-option
        is-with-source-option
        is-with-playlist-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-queue-option
        is-with-save-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseProfileLibraryArtistPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPaginatedPageContainer
  from '@/components/containers/pages/profile/library/artist/BaseProfileLibraryArtistPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseProfileLibraryArtistTracksPlayButton
  from '@/components/buttons/play/profile/library/artist/BaseProfileLibraryArtistTracksPlayButton.vue'
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
    BaseProfileLibraryArtistPaginatedPageContainer,
    BaseTracksSimpleList,
    BaseProfileLibraryArtistTracksPlayButton
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryArtistId: String
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
