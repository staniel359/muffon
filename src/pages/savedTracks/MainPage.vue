<template>
  <BaseSavedTracksPaginatedPageContainer
    :key="refreshKey"
    model="savedTrack"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :is-with-self-icons="false"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-duration
        is-with-source
        is-with-created
        is-with-source-option
        is-with-playlist-option
        is-with-queue-option
        is-with-share-option
        is-with-external-link-option
        is-with-delete-option
      />
    </template>
  </BaseSavedTracksPaginatedPageContainer>
</template>

<script>
import BaseSavedTracksPaginatedPageContainer
  from '@/components/containers/pages/savedTracks/BaseSavedTracksPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BaseSavedTracksPaginatedPageContainer,
    BaseTracksSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  data () {
    return {
      limit:
        tracksLimits.simple.large,
      scope: 'tracks',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
