<template>
  <div class="main-self-container self-section">
    <BaseSelfIcons
      class="track-self-icons"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <BaseTrackOptionsPopup
      :track-data="trackData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      is-with-library-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-playlist-option
      is-with-save-option
      is-with-share-option
      is-with-queue-option
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseTrackOptionsPopup
  from '@/components/popups/track/BaseTrackOptionsPopup.vue'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseTrackOptionsPopup
  },
  props: {
    trackData: Object,
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  }
}
</script>

<style lang="sass" scoped>
.self-section
  margin-top: 1em

.track-self-icons
  @extend .text-align-center
  max-width: 75px
</style>
